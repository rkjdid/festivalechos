from django import template

register = template.Library()

@register.simple_tag
def active(path, pattern):
  import re
  if re.search(pattern, path):
    return 'active'
  return ''

@register.simple_tag
def href(request, path):
  if request.session.get('site-prefix') is None:
    return path
  else:
    return request.session.get('site-prefix') + path
