from django.db import models


class Event(models.Model):
    """A volunteering event - e.g. a mindful colouring session, a street
    outreach evening, the Sleep Out fundraiser - made up of one or more
    shifts that volunteers can offer to cover."""

    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    location = models.CharField(max_length=200, blank=True)
    date = models.DateField()
    is_published = models.BooleanField(
        default=True, help_text="Untick to hide this event from the public site without deleting it."
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["date"]

    def __str__(self):
        return f"{self.title} - {self.date:%d %b %Y}"


class Shift(models.Model):
    """A single shift within an event that volunteers can sign up to cover."""

    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="shifts")
    label = models.CharField(max_length=150, help_text="e.g. 'Morning setup', 'Serving', 'Pack-down'.")
    start_time = models.TimeField()
    end_time = models.TimeField()
    capacity = models.PositiveIntegerField(default=1, help_text="How many volunteers this shift needs.")

    class Meta:
        ordering = ["event__date", "start_time"]

    def __str__(self):
        return f"{self.event.title} - {self.label} ({self.start_time:%H:%M}-{self.end_time:%H:%M})"

    @property
    def spaces_left(self):
        return max(0, self.capacity - self.signups.count())

    @property
    def is_full(self):
        return self.spaces_left <= 0


class ShiftSignup(models.Model):
    """A volunteer offering to cover a shift."""

    shift = models.ForeignKey(Shift, on_delete=models.CASCADE, related_name="signups")
    volunteer_name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=30, blank=True)
    message = models.TextField(blank=True, help_text="Anything the volunteer wants Scott to know.")
    created_at = models.DateTimeField(auto_now_add=True)
    is_confirmed = models.BooleanField(default=False, help_text="Tick once Scott has confirmed this volunteer.")

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.volunteer_name} - {self.shift}"
