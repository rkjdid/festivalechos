# -*- coding: utf-8 -*-
from django.http import HttpResponse
from django.shortcuts import render_to_response, redirect
from django.template.context import RequestContext
import os

base_params = dict()


def home(request):
  base_params['lang'] = request.session.get('lang', 'fr')

  return render_to_response(
    'home.html',
    base_params,
    context_instance=RequestContext(request)
  )

# Static binary serve (pdf, jpg, ..)
def static_serve(request, target, content_type):
  f = open(os.path.join(os.getcwd(), 'echos', target), 'rb')
  content = f.read()
  f.close()
  fname = os.path.basename(os.path.normpath(target))

  response = HttpResponse(content, content_type)
  response['Content-Disposition'] = 'filename=%s' % fname
  return response

###########################
# ###### Redirects ###### #
def redirectHome(request):
  return redirect(
    '/',
    context_instance=RequestContext(request)
  )
