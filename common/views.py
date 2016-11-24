# -*- coding: utf-8 -*-
from __future__ import print_function, unicode_literals
from django.http import HttpResponse, Http404
import os

# Static binary serve (pdf, jpg, ..)
def static_serve(request, target, content_type):
	try:
		f = open(target, 'rb')
		content = f.read()
		f.close()
	except:
		raise Http404("file not found")

	fname = os.path.basename(os.path.normpath(target))
	response = HttpResponse(content, content_type)
	response['Content-Disposition'] = 'filename=%s' % fname
	return response