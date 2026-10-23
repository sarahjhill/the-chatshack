from django.urls import path

from .views import CreateCheckoutSessionView, DonationCheckoutView, ItemListView, StripeWebhookView

urlpatterns = [
    path("shop/items/", ItemListView.as_view(), name="api-shop-items"),
    path("shop/checkout/", CreateCheckoutSessionView.as_view(), name="api-shop-checkout"),
    path("shop/donate/", DonationCheckoutView.as_view(), name="api-shop-donate"),
    path("shop/webhook/", StripeWebhookView.as_view(), name="api-shop-webhook"),
]
