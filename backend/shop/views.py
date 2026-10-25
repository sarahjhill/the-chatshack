import logging

import stripe
from django.conf import settings
from django.utils import timezone
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Item, Order, OrderItem
from .serializers import CheckoutRequestSerializer, DonationRequestSerializer, ItemSerializer

logger = logging.getLogger(__name__)

stripe.api_key = settings.STRIPE_SECRET_KEY


class ItemListView(generics.ListAPIView):
    """GET /api/shop/items/ - the active "Buy an item" catalogue, public."""

    queryset = Item.objects.filter(is_active=True)
    serializer_class = ItemSerializer
    permission_classes = [AllowAny]
    pagination_class = None


class CreateCheckoutSessionView(APIView):
    """POST /api/shop/checkout/ - takes the donor's chosen items/quantities,
    creates a pending Order + its OrderItem snapshots, starts a Stripe
    Checkout Session for the total, and hands back the URL to send the
    donor's browser to. Stripe itself collects the card details - this
    site never sees or touches them."""

    permission_classes = [AllowAny]

    def post(self, request):
        serializer = CheckoutRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        item_ids = [line["item_id"] for line in data["items"]]
        items_by_id = {item.id: item for item in Item.objects.filter(id__in=item_ids, is_active=True)}

        missing = [item_id for item_id in item_ids if item_id not in items_by_id]
        if missing:
            return Response(
                {"detail": f"Some items are no longer available: {missing}"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not settings.STRIPE_SECRET_KEY:
            return Response(
                {"detail": "Payments are not yet configured on this site. Please try again soon."},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        total = sum(items_by_id[line["item_id"]].price * line["quantity"] for line in data["items"])

        order = Order.objects.create(
            donor_name=data.get("donor_name", ""),
            donor_email=data.get("donor_email", ""),
            total_amount=total,
            status="pending",
        )
        for line in data["items"]:
            item = items_by_id[line["item_id"]]
            OrderItem.objects.create(
                order=order,
                item=item,
                item_name=item.name,
                unit_price=item.price,
                quantity=line["quantity"],
            )

        line_items = [
            {
                "price_data": {
                    "currency": "gbp",
                    "product_data": {"name": items_by_id[line["item_id"]].name},
                    "unit_amount": int(items_by_id[line["item_id"]].price * 100),
                },
                "quantity": line["quantity"],
            }
            for line in data["items"]
        ]

        frontend_url = settings.FRONTEND_URL.rstrip("/")
        try:
            session = stripe.checkout.Session.create(
                mode="payment",
                line_items=line_items,
                customer_email=data.get("donor_email") or None,
                success_url=f"{frontend_url}/donate?purchase=success&session_id={{CHECKOUT_SESSION_ID}}",
                cancel_url=f"{frontend_url}/donate?purchase=cancelled",
                metadata={"order_id": str(order.id)},
            )
        except stripe.error.StripeError as exc:
            logger.exception("Stripe Checkout Session creation failed for order %s", order.id)
            order.status = "failed"
            order.save(update_fields=["status"])
            return Response({"detail": f"Could not start checkout: {exc.user_message or str(exc)}"}, status=502)

        order.stripe_checkout_session_id = session.id
        order.save(update_fields=["stripe_checkout_session_id"])

        return Response({"checkout_url": session.url}, status=status.HTTP_201_CREATED)


class DonationCheckoutView(APIView):
    """POST /api/shop/donate/ - a general, undirected donation (the
    "Make a Donation" section) rather than a specific item purchase.
    Creates a pending Order for bookkeeping, then a Stripe Checkout
    Session for the chosen amount."""

    permission_classes = [AllowAny]

    def post(self, request):
        serializer = DonationRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        if not settings.STRIPE_SECRET_KEY:
            return Response(
                {"detail": "Payments are not yet configured on this site. Please try again soon."},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        amount = data["amount"]
        order = Order.objects.create(
            donor_name=data.get("donor_name", ""),
            donor_email=data.get("donor_email", ""),
            total_amount=amount,
            status="pending",
        )
        OrderItem.objects.create(
            order=order,
            item=None,
            item_name="General donation",
            unit_price=amount,
            quantity=1,
        )

        frontend_url = settings.FRONTEND_URL.rstrip("/")
        try:
            session = stripe.checkout.Session.create(
                mode="payment",
                line_items=[
                    {
                        "price_data": {
                            "currency": "gbp",
                            "product_data": {"name": "Donation to The Chat Shack"},
                            "unit_amount": int(amount * 100),
                        },
                        "quantity": 1,
                    }
                ],
                customer_email=data.get("donor_email") or None,
                success_url=f"{frontend_url}/donate?purchase=success&session_id={{CHECKOUT_SESSION_ID}}",
                cancel_url=f"{frontend_url}/donate?purchase=cancelled",
                metadata={"order_id": str(order.id)},
            )
        except stripe.error.StripeError as exc:
            logger.exception("Stripe Checkout Session creation failed for donation order %s", order.id)
            order.status = "failed"
            order.save(update_fields=["status"])
            return Response({"detail": f"Could not start checkout: {exc.user_message or str(exc)}"}, status=502)

        order.stripe_checkout_session_id = session.id
        order.save(update_fields=["stripe_checkout_session_id"])

        return Response({"checkout_url": session.url}, status=status.HTTP_201_CREATED)


@method_decorator(csrf_exempt, name="dispatch")
class StripeWebhookView(APIView):
    """POST /api/shop/webhook/ - Stripe calls this itself once a payment
    succeeds or fails. Verifies Stripe's signature so nobody else can fake
    a "paid" event, then marks the matching Order accordingly."""

    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        payload = request.body
        sig_header = request.META.get("HTTP_STRIPE_SIGNATURE", "")

        if not settings.STRIPE_WEBHOOK_SECRET:
            logger.error("Stripe webhook received but STRIPE_WEBHOOK_SECRET is not configured.")
            return Response(status=503)

        try:
            event = stripe.Webhook.construct_event(payload, sig_header, settings.STRIPE_WEBHOOK_SECRET)
        except (ValueError, stripe.error.SignatureVerificationError):
            logger.warning("Stripe webhook signature verification failed.")
            return Response(status=400)

        if event["type"] == "checkout.session.completed":
            session = event["data"]["object"]
            order_id = (session.get("metadata") or {}).get("order_id")
            if order_id:
                Order.objects.filter(id=order_id).update(
                    status="paid",
                    stripe_payment_intent_id=session.get("payment_intent", ""),
                    paid_at=timezone.now(),
                )
        elif event["type"] in ("checkout.session.expired", "checkout.session.async_payment_failed"):
            session = event["data"]["object"]
            order_id = (session.get("metadata") or {}).get("order_id")
            if order_id:
                Order.objects.filter(id=order_id).update(status="failed")

        return Response(status=200)
