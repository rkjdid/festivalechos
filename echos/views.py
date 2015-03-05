# -*- coding: utf-8 -*-
from urllib2 import Request
from django.shortcuts import render_to_response, redirect, render
from django.template.context import RequestContext
from django.http import HttpResponse

import models as m

base_params = dict(
  lang='en'
)


def home(request):
  return render_to_response(
    '0.home.html',
    base_params,
    context_instance=RequestContext(request)
  )


def presentation(request):
  base_params.update(dict(
    contentTitle='Présentation',
    request=request,
    banner="1"
  ))

  return render_to_response(
    '1.presentation.html',
    base_params,
    context_instance=RequestContext(request)
  )


def contact(request):
  base_params.update(dict(
    contentTitle='Contact',
    request=request,
    banner="2"
  ))

  return render_to_response(
    '2.contact.html',
    base_params,
    context_instance=RequestContext(request)
  )


def progra(request):
  base_params.update(dict(
    contentTitle='Programmation',
    request=request,
    banner="3"
  ))

  return render_to_response(
    '3.programmation.html',
    base_params,
    context_instance=RequestContext(request)
  )


def qui(request):
  base_params.update(dict(
    contentTitle='Dôme',
    request=request,
    banner="4",
    page="qui"
  ))

  return render_to_response(
    '4.qui.html',
    base_params,
    context_instance=RequestContext(request)
  )


def acces(request):
  base_params.update(dict(
    contentTitle='Comment venir',
    request=request,
    banner="5"
  ))

  return render_to_response(
    '5.acces.html',
    base_params,
    context_instance=RequestContext(request)
  )


def resa(request):
  base_params.update(dict(
    contentTitle='Réservation',
    request=request,
    banner="6"
  ))

  return render_to_response(
    '6.reservation.html',
    base_params,
    context_instance=RequestContext(request)
  )


def win(request):
  base_params.update(dict(
    contentTitle='Merci !',
    request=request,
    banner="6"  # ?
  ))

  return render_to_response(
    '10.thx.html',
    base_params,
    context_instance=RequestContext(request)
  )


def ferme(request):
  base_params.update(dict(
    contentTitle='La Ferme du Faï',
    request=request,
    banner="7"
  ))

  return render_to_response(
    '7.ferme.html',
    base_params,
    context_instance=RequestContext(request)
  )


def trompes(request):
  base_params.update(dict(
    contentTitle='Le système acoustique',
    request=request,
    banner="8"
  ))

  return render_to_response(
    '8.trompes.html',
    base_params,
    context_instance=RequestContext(request)
  )


def zzz(request):
  base_params.update(dict(
    contentTitle='Quoi dormir / Où manger',
    request=request,
    banner="9"
  ))

  return render_to_response(
    '9.zzz.html',
    base_params,
    context_instance=RequestContext(request)
  )


def sitemap(request):
  return render(
    request,
    'parts/sitemap.xml',
    content_type="application/xml"
  )


###########################
# ###### Redirects ###### #
def redirectEchos(request):
  return redirect(
    '/echos/presentation',
    context_instance=RequestContext(request)
  )


def redirectHome(request):
  return redirect(
    '/',
    context_instance=RequestContext(request)
  )


def redirectLieu(request):
  return redirect(
    '/lieu/ferme',
    context_instance=RequestContext(request)
  )


def redirectModalites(request):
  return redirect(
    '/modalites/acces',
    context_instance=RequestContext(request)
  )


def redirectQui(request):
  return redirect(
    '/dome',
    context_instance=RequestContext(request)
  )


def redirectContact(request):
  return redirect(
    '/contact',
    context_instance=RequestContext(request)
  )


def redirectAdmin(request):
  return redirect(
    '/underground/',
    context_instance=RequestContext(request)
  )
