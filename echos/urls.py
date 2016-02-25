from django.conf.urls import patterns, url
from django.http import HttpResponse

# Uncomment the next two lines to enable the admin:
import echos.views

urlpatterns = patterns('',
  url(r'^/?$', echos.views.home, name='home'),
)

# robots.txt
urlpatterns += patterns('',
  url(r'^robots.txt', lambda r: HttpResponse("User-agent: *\nDisallow:", mimetype="text/plain")),
)

# Redirects
urlpatterns += patterns('',
  url(r'^.*', echos.views.redirectHome),  # Home
)
