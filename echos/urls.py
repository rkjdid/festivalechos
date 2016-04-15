from django.conf.urls import patterns, url
from django.http import HttpResponse

# Uncomment the next two lines to enable the admin:
import echos.views

# robots.txt
urlpatterns = patterns('',
  url(r'^robots.txt', lambda r: HttpResponse("User-agent: *\nDisallow:", mimetype="text/plain")),
)

# catch'em'all
urlpatterns += patterns('',
  url(r'^/?.*$', echos.views.home, name='home'),
)
