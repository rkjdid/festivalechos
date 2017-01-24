from django.conf.urls import url
from django.http import HttpResponse

from echos2016 import views
import common.views
import os
from settings import STATIC_ROOT

# catch'em'all
urls = [
	url(r'^echos_fr.pdf', common.views.static_serve,
			{'target': os.path.join(STATIC_ROOT, 'echos2016/misc/echos_fr.pdf'),
			 'content_type': 'application/pdf'}),
	url(r'^echos_en.pdf', common.views.static_serve,
			{'target': os.path.join(STATIC_ROOT, 'echos2016/misc/echos_en.pdf'),
			 'content_type': 'application/pdf'}),

	url(r'^$',              views.home),

	# catch all urls that are further down
	# interpreted by js to render dynamically
	url(r'^infos$',         views.home),
	url(r'^dome$',          views.home),
	url(r'^tickets$',       views.home),
	url(r'^ferme$',         views.home),
	url(r'^programmation$', views.home),
	url(r'^acces$',         views.home),
]
