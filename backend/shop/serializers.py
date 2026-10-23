from rest_framework import serializers

from .models import Item


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ["id", "name", "description", "price", "image", "display_order"]


class CheckoutLineSerializer(serializers.Serializer):
    """One line of a checkout request: which item, and how many."""

    item_id = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value=1, max_value=50)


class CheckoutRequestSerializer(serializers.Serializer):
    """The whole 'Buy these items' request from the Donate page."""

    items = CheckoutLineSerializer(many=True, allow_empty=False)
    donor_name = serializers.CharField(max_length=150, required=False, allow_blank=True)
    donor_email = serializers.EmailField(required=False, allow_blank=True)


class DonationRequestSerializer(serializers.Serializer):
    """A general, undirected donation (not tied to a specific item) from
    the Donate page's "Make a Donation" section."""

    amount = serializers.DecimalField(max_digits=8, decimal_places=2, min_value=1)
    donor_name = serializers.CharField(max_length=150, required=False, allow_blank=True)
    donor_email = serializers.EmailField(required=False, allow_blank=True)
