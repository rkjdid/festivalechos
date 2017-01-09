from django.conf.urls import url, include
from django.http import HttpResponse
from django.views.generic import RedirectView

# robots.txt & sitemap.xml
urlpatterns = [
  url(r'^robots.txt', lambda r: HttpResponse("User-agent: *\nDisallow:",
                                             mimetype="text/plain")),
  url(r'^sitemap.xml', lambda r: HttpResponse(
    "http://festivalechos.fr/", mimetype="text/plain"
  )),
]

# route to specific editions
# import echos2013.urls as echos2013
# import echos2014.urls as echos2014
# import echos2015.urls as echos2015
import echos2016.urls as echos2016

urlpatterns += [
  # url(r'^2013$', RedirectView.as_view(url="2013/")),
  # url(r'^2014$', RedirectView.as_view(url="2014/")),
  # url(r'^2015$', RedirectView.as_view(url="2015/")),
  url(r'^2016$', RedirectView.as_view(url="/")),
]

urlpatterns += [
  # url(r'^2013/', include(echos2013.urls)),
  # url(r'^2014/', include(echos2014.urls)),
  # url(r'^2015/', include(echos2015.urls)),
  url(r'^', include(echos2016.urls)),

  # catch'em all
  url(r'^.*$', RedirectView.as_view(url="/"))
]
