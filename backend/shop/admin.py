from django.contrib import admin
from unfold.admin import ModelAdmin, TabularInline

from .models import Item, Order, OrderItem


@admin.register(Item)
class ItemAdmin(ModelAdmin):
    list_display = ["name", "price", "supplier_name", "is_active", "display_order"]
    list_editable = ["price", "is_active", "display_order"]
    list_filter = ["is_active"]
    search_fields = ["name", "description", "supplier_name"]
    fieldsets = (
        (None, {"fields": ("name", "description", "price", "image", "is_active", "display_order")}),
        (
            "Supplier payout (Phase 2 - optional)",
            {
                "fields": ("supplier_name", "stripe_connected_account_id"),
                "description": "Leave blank for now. Fill these in only once a named business has its own "
                "connected Stripe account set up, so this item's payments route straight to them.",
            },
        ),
    )


class OrderItemInline(TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ["item", "item_name", "unit_price", "quantity"]
    can_delete = False


@admin.register(Order)
class OrderAdmin(ModelAdmin):
    list_display = ["id", "donor_display", "total_amount", "status", "created_at", "paid_at"]
    list_filter = ["status", "created_at"]
    search_fields = ["donor_name", "donor_email", "stripe_checkout_session_id", "stripe_payment_intent_id"]
    readonly_fields = [
        "donor_name",
        "donor_email",
        "total_amount",
        "status",
        "stripe_checkout_session_id",
        "stripe_payment_intent_id",
        "created_at",
        "paid_at",
    ]
    inlines = [OrderItemInline]

    @admin.display(description="Donor")
    def donor_display(self, obj):
        return obj.donor_name or obj.donor_email or "Anonymous"

    def has_add_permission(self, request):
        return False
