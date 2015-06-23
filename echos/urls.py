from django.conf.urls import patterns, include, url
from django.http import HttpResponse
from django.shortcuts import redirect

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
import echos.views

admin.autodiscover()

urlpatterns = patterns('',
  url(r'^/?$', echos.views.home, name='home'),

  # ECHOS
  url(r'^echos/presentation/?$', echos.views.presentation, name='presentation'),
  url(r'^echos/programmation/?$', echos.views.progra, name='programmation'),

  # QUI ?
  url(r'^dome/?$', echos.views.qui, name='qui'),

  # LIEU
  url(r'^lieu/ferme/?$', echos.views.ferme, name='ferme'),
  url(r'^lieu/trompes/?$', echos.views.trompes, name='trombes'),

  # MODALITES
  url(r'^modalites/acces/?$', echos.views.acces, name='acces'),
  url(r'^modalites/zzz/?$', echos.views.zzz, name='zzz'),

  # CONTACT
  url(r'^contact/?$', echos.views.contact, name='contact'),

  # SITEMAP
  url(r'^sitemap.xml$', echos.views.sitemap),

  # AJAX
  # url(r'^grandseigneur/?$', 'echos2013.ajax.giveAway'),

  # Uncomment the admin/doc line below to enable admin documentation:
  url(r'^underground/', include(admin.site.urls)),
)

# robots.txt
urlpatterns += patterns('',
  url(r'^robots.txt', lambda r: HttpResponse("User-agent: *\nDisallow:", mimetype="text/plain")),
)


# Bonuses
urlpatterns += patterns('',
  # url(r'^disco/?$','echos2013.views.disco',name="bonusDisco"),
)


# Redirects
urlpatterns += patterns('',
  url(r'^echos/', echos.views.redirectEchos),  # Echos
  url(r'^lieu/', echos.views.redirectLieu),  # Lieu
  url(r'^modalites/', echos.views.redirectModalites),  # Modalites
  url(r'^qui', echos.views.redirectQui),  # Qui
  url(r'^contact', echos.views.redirectContact),  # Contact
  url(r'^underground', echos.views.redirectAdmin),  # Admin
  url(r'^.*', echos.views.redirectHome),  # Home
)
