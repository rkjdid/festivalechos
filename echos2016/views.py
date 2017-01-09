# -*- coding: utf-8 -*-
from django.shortcuts import render_to_response, redirect
from django.template.context import RequestContext
import os

def home(request):
	context = RequestContext(request).update(dict(
		lang=request.session.get('lang', 'fr'),
		request=request
	))
	return render_to_response('echos2016/home.html', context)
