class LangMiddleware(object):
	def __init__(self, get_response=None):
		self.get_response = get_response

	def __call__(self, request):
		self.process_request(request)
		response = self.get_response(request)
		return self.process_response(request, response)

	def process_request(self, request):
		lang = request.GET.get('lang')
		if lang == '' and 'lang' in request.COOKIES.get('lang'):
			lang = request.COOKIES.get('lang')
		if lang == '' and 'lang' in request.session:
			lang = request.session['lang']

		# apply to session if it makes sense
		if lang == 'en' or lang == 'fr':
			request.session['lang'] = lang
		else: # or just use french
			request.session['lang'] = 'fr'

	def process_response(self, request, response):
		lang = request.session.get('lang')
		if 'Content-Language' not in response:
			response['Content-Language'] = lang
		response.set_cookie('lang', lang, max_age=365*24*60*60)
		return response
