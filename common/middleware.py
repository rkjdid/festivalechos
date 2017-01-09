class LangMiddleware(object):
	def __init__(self, get_response=None):
		self.get_response = get_response

	def __call__(self, request):
		self.process_request(request)
		response = self.get_response(request)
		return self.process_response(request, response)

	def process_request(self, request):
		lang = request.GET.get('lang')
		if not lang and 'lang' in request.COOKIES:
			lang = request.COOKIES.get('lang')
		if not lang and 'lang' in request.session:
			lang = request.session['lang']

		# apply to session if it makes sense
		if lang == 'en' or lang == 'fr':
			request.session['lang'] = lang
		else: # or just use french
			request.session['lang'] = 'fr'

	def process_response(self, request, response):
		from echos.settings import SESSION_COOKIE_AGE
		lang = request.session.get('lang')
		if 'Content-Language' not in response:
			response['Content-Language'] = lang
		response.set_cookie('lang', lang, max_age=SESSION_COOKIE_AGE)
		return response

class SiteMiddleware(object):
	def __init__(self, get_response=None):
		self.get_response = get_response

	def __call__(self, request):
		if request.path.startswith('/2013'):
			request.session['site-prefix'] = '/2013/'
		elif request.path.startswith('/2014'):
			request.session['site-prefix'] = '/2014/'
		elif request.path.startswith('/2015'):
			request.session['site-prefix'] = '/2015/'
		else:
			request.session['site-prefix'] = '/'
		return self.get_response(request)
