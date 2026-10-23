from django.contrib import admin
from django.urls import include, path

admin.site.site_header = "The ChatShack - Admin"
admin.site.site_title = "The ChatShack Admin"
admin.site.index_title = "Manage the site"

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("content.urls")),
    path("api/", include("submissions.urls")),
    path("api/", include("volunteering.urls")),
    path("api/", include("shop.urls")),
]
