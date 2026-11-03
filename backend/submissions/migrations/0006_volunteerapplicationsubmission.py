# Generated for the volunteer application form

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('submissions', '0005_sleepoutinterestsubmission'),
    ]

    operations = [
        migrations.CreateModel(
            name='VolunteerApplicationSubmission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
                ('email', models.EmailField(max_length=254)),
                ('phone', models.CharField(blank=True, max_length=30)),
                ('roles', models.CharField(blank=True, help_text="Which volunteer roles they're interested in (comma-separated).", max_length=300)),
                ('availability', models.TextField(blank=True, help_text="When they're usually free.")),
                ('about', models.TextField(help_text="About them and why they'd like to volunteer.")),
                ('is_over_18', models.BooleanField(default=False, help_text="They confirmed they're aged 18 or over.")),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('status', models.CharField(choices=[('new', 'New'), ('in_review', 'In review'), ('approved', 'Approved volunteer'), ('declined', 'Declined')], default='new', max_length=20)),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
    ]
