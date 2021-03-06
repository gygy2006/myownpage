from django.urls.conf import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views


urlpatterns = [
    path("", views.BookmarkAPIView.as_view()),
    path("sites/", views.AllSites.as_view()),
    path("locked/",views.bookmark_site_locked)

]

urlpatterns = format_suffix_patterns(urlpatterns)
