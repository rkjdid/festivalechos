# -*- coding: utf-8 -*-
from __future__ import print_function, unicode_literals

class DomainMiddleware(object):
  """
  Determine language from domain
  """

  def process_request(self, request):
    if 'en' == request.META['HTTP_HOST'].split('.')[0]:
      request.session['lang'] = 'en'
    else:
      request.session['lang'] = 'fr'

  def process_response(self, request, response):
    language = request.session.get('lang')
    if 'Content-Language' not in response and not language is None:
      response['Content-Language'] = language

    return response
