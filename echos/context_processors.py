def debug_mode(request):
    from django.conf import settings
    return {'debug': settings.DEBUG}