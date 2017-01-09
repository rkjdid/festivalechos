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
	url(r'^$', views.home, name='home')
]
