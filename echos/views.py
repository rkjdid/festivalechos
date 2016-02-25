# -*- coding: utf-8 -*-
from django.shortcuts import render_to_response, redirect
from django.template.context import RequestContext

base_params = dict()


def home(request):
  base_params['lang'] = request.session.get('lang', 'fr')

  return render_to_response(
    'teaz.html',
    base_params,
    context_instance=RequestContext(request)
  )

###########################
# ###### Redirects ###### #
def redirectHome(request):
  return redirect(
    '/',
    context_instance=RequestContext(request)
  )
