from django.contrib import admin

from .models import Event, Shift, ShiftSignup


class ShiftSignupInline(admin.TabularInline):
    model = ShiftSignup
    extra = 0
    readonly_fields = ["volunteer_name", "email", "phone", "message", "created_at"]
    fields = ["volunteer_name", "email", "phone", "message", "is_confirmed", "created_at"]


class ShiftInline(admin.TabularInline):
    model = Shift
    extra = 1
    fields = ["label", "start_time", "end_time", "capacity"]
    show_change_link = True


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ["title", "date", "location", "is_published", "shift_count"]
    list_filter = ["is_published", "date"]
    search_fields = ["title", "description", "location"]
    inlines = [ShiftInline]

    @admin.display(description="Shifts")
    def shift_count(self, obj):
        return obj.shifts.count()


@admin.register(Shift)
class ShiftAdmin(admin.ModelAdmin):
    list_display = ["__str__", "event", "capacity", "signup_count", "spaces_left"]
    list_filter = ["event"]
    inlines = [ShiftSignupInline]

    @admin.display(description="Signed up")
    def signup_count(self, obj):
        return obj.signups.count()

    @admin.display(description="Spaces left")
    def spaces_left(self, obj):
        return obj.spaces_left


@admin.register(ShiftSignup)
class ShiftSignupAdmin(admin.ModelAdmin):
    list_display = ["volunteer_name", "shift", "email", "phone", "created_at", "is_confirmed"]
    list_filter = ["is_confirmed", "created_at"]
    search_fields = ["volunteer_name", "email", "phone"]
    readonly_fields = ["volunteer_name", "email", "phone", "message", "shift", "created_at"]
