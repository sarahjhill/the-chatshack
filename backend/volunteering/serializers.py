from rest_framework import serializers

from .models import Event, Shift, ShiftSignup


class ShiftSerializer(serializers.ModelSerializer):
    spaces_left = serializers.ReadOnlyField()
    is_full = serializers.ReadOnlyField()

    class Meta:
        model = Shift
        fields = ["id", "label", "start_time", "end_time", "capacity", "spaces_left", "is_full"]


class EventSerializer(serializers.ModelSerializer):
    shifts = ShiftSerializer(many=True, read_only=True)

    class Meta:
        model = Event
        fields = ["id", "title", "description", "location", "date", "shifts"]


class ShiftSignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShiftSignup
        fields = ["volunteer_name", "email", "phone", "message"]

    def validate(self, attrs):
        shift = self.context["shift"]
        if shift.is_full:
            raise serializers.ValidationError("Sorry, this shift is already fully covered.")
        return attrs

    def create(self, validated_data):
        validated_data["shift"] = self.context["shift"]
        return super().create(validated_data)
