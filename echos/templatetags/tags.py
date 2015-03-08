from django import template

register = template.Library()

@register.simple_tag
def active(request, pattern):
    import re
    if re.search(pattern, request.path):
        return 'active'
    return ''

@register.simple_tag
def subdomain(request, lang):
  prefix = 'http'
  if request.is_secure():
    prefix += 's:'
  prefix += '://'

  if lang == 'fr':
    prefix += 'festivalechos.fr'
  else:
    prefix += 'en.festivalechos.fr'

  return prefix
