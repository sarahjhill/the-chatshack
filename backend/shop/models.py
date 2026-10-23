from django.db import models


class Item(models.Model):
    """Something a donor can buy directly for someone who needs it (a tent,
    a hot meal, a sleeping bag, a hat) rather than giving an undirected
    donation. Shown as a card in the "Buy an item" section of the Donate
    page.

    Phase 1: every item is paid straight into The Chat Shack's own Stripe
    account, and Scott/Sarah arrange payment to whichever supplier fulfils
    it. Phase 2 (once a specific business partner is onboarded with their
    own Stripe account): fill in stripe_connected_account_id on an item and
    its payments will route straight to that business instead - no other
    change needed.
    """

    name = models.CharField(max_length=100, help_text="e.g. 'Sleeping bag', 'Hot meal'.")
    description = models.CharField(
        max_length=200,
        blank=True,
        help_text="One short line shown under the item name, e.g. 'Keeps someone warm and dry overnight.'",
    )
    price = models.DecimalField(max_digits=8, decimal_places=2, help_text="Price in GBP, e.g. 25.00 for £25.")
    image = models.ImageField(upload_to="shop_items/", blank=True, null=True)
    is_active = models.BooleanField(default=True, help_text="Untick to hide this item from the site without deleting it.")
    display_order = models.PositiveIntegerField(
        default=0, help_text="Lower numbers show first. Items with the same number keep their creation order."
    )

    # Phase 2 (Stripe Connect) - left blank until a specific supplier is
    # onboarded with their own Stripe account.
    supplier_name = models.CharField(
        max_length=150,
        blank=True,
        help_text="Optional: the named business supplying this item, once one is confirmed.",
    )
    stripe_connected_account_id = models.CharField(
        max_length=100,
        blank=True,
        help_text="Optional - only set once the supplier above has their own connected Stripe account "
        "(starts 'acct_'). Leave blank to keep this item's payments going to The Chat Shack's own account.",
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["display_order", "created_at"]

    def __str__(self):
        return f"{self.name} (£{self.price})"


class Order(models.Model):
    """One checkout - a donor may buy several different items/quantities
    in a single order. Created as 'pending' the moment a Stripe Checkout
    Session is started, then flipped to 'paid' by the webhook once Stripe
    confirms the payment actually went through."""

    STATUS_CHOICES = [
        ("pending", "Pending payment"),
        ("paid", "Paid"),
        ("failed", "Failed / abandoned"),
    ]

    donor_name = models.CharField(max_length=150, blank=True)
    donor_email = models.EmailField(blank=True)
    total_amount = models.DecimalField(max_digits=8, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")

    stripe_checkout_session_id = models.CharField(max_length=200, blank=True, db_index=True)
    stripe_payment_intent_id = models.CharField(max_length=200, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    paid_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        who = self.donor_name or self.donor_email or "Anonymous"
        return f"Order #{self.pk} - {who} - £{self.total_amount} ({self.get_status_display()})"


class OrderItem(models.Model):
    """One line of an order - a snapshot of the item's name/price at the
    time of purchase, so later price changes never rewrite history."""

    order = models.ForeignKey(Order, related_name="items", on_delete=models.CASCADE)
    item = models.ForeignKey(Item, related_name="order_items", on_delete=models.SET_NULL, null=True, blank=True)
    item_name = models.CharField(max_length=100, help_text="Snapshot of the item's name at time of purchase.")
    unit_price = models.DecimalField(max_digits=8, decimal_places=2, help_text="Snapshot of the price at time of purchase.")
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} x {self.item_name}"

    @property
    def line_total(self):
        return self.unit_price * self.quantity
