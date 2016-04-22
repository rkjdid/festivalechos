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
  url(r'^echos_fr.pdf', echos.views.static_serve,
      {'target': 'img/echos_fr.pdf',
       'content_type': 'application/pdf'}),
  url(r'^echos_en.pdf', echos.views.static_serve,
      {'target': 'img/echos_en.pdf',
       'content_type': 'application/pdf'}),
  url(r'^/?.*$', echos.views.home, name='home'),
)
