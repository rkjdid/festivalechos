# -*- coding: utf-8 -*-
from django.shortcuts import render_to_response, redirect
from django.template.context import RequestContext
import os

def home(request):
	context = RequestContext(request)
	context['lang'] = request.session.get('lang', 'fr')
	return render_to_response('echos2016/home.html', context)

###########################
# ###### Redirects ###### #
def redirect_home(request):
	return redirect(
		'/',
		context_instance=RequestContext(request)
	)
