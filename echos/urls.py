from django.conf.urls import url, include
from django.http import HttpResponse

# robots.txt
urlpatterns = [
	url(r'^robots.txt', lambda r: HttpResponse("User-agent: *\nDisallow:", mimetype="text/plain")),
]

# sitemap.xml
urlpatterns += [
	url(r'^sitemap.xml', lambda r: HttpResponse(
		"http://festivalechos.fr/", mimetype="text/plain"
	)),
]

# route to specific editions
# from echos2013.urls import urls as urls2013
# from echos2014.urls import urls as urls2014
# from echos2015.urls import urls as urls2015
import echos2016.urls as echos2016

urlpatterns += [
	url(r'^2016', include(echos2016.urls)),
	url(r'^', include(echos2016.urls))
]
