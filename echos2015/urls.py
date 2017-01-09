from django.conf.urls import url
import echos2015.views as views

urls = [
  url(r'^$', views.home, name='home'),

  # ECHOS
  url(r'^echos/presentation/?$', views.presentation, name='presentation'),
  url(r'^echos/programmation/?$', views.progra, name='programmation'),
  # url(r'^echos/reservation/?$', views.resa, name='reservation'),

  # QUI ?
  url(r'^dome/?$', views.qui, name='qui'),

  # LIEU
  url(r'^lieu/ferme/?$', views.ferme, name='ferme'),
  url(r'^lieu/trompes/?$', views.trompes, name='trombes'),

  # MODALITES
  url(r'^modalites/acces/?$', views.acces, name='acces'),
  url(r'^modalites/zzz/?$', views.zzz, name='zzz'),

  # CONTACT
  url(r'^contact/?$', views.contact, name='contact'),
]
