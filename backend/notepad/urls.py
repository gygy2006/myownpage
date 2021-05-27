from django.urls.conf import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views


urlpatterns = [
    path("info", views.user_notepads),
]

urlpatterns = format_suffix_patterns(urlpatterns)

