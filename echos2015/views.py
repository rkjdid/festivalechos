# -*- coding: utf-8 -*-
from django.shortcuts import render_to_response
from django.template.context import RequestContext

def home(request):
  context = RequestContext(request).update(
    dict(
      request=request,
      lang=request.session.get('lang', 'fr'),
    )
  )
  return render_to_response('echos2015/0.home.html', context)


def presentation(request):
  context = RequestContext(request).update(
    dict(
      request=request,
      banner="1",
      lang=request.session.get('lang', 'fr'),
    )
  )
  if context['lang'] == 'fr':
    context['contentTitle'] = 'Présentation'
  else :
    context['contentTitle'] = 'Introduction'
  return render_to_response('echos2015/1.presentation.html', context)


def contact(request):
  context = RequestContext(request).update(
    dict(
      contentTitle="Contact",
      request=request,
      banner="2",
      lang=request.session.get('lang', 'fr'),
    )
  )
  return render_to_response('echos2015/2.contact.html', context)


def progra(request):
  context = RequestContext(request).update(
    dict(
      request=request,
      banner="3",
      lang=request.session.get('lang', 'fr'),
    )
  )
  if context['lang'] == 'fr':
    context['contentTitle'] = 'Programmation'
  else:
    context['contentTitle'] = 'Program'
  return render_to_response('echos2015/3.programmation.html', context)


def qui(request):
  context = RequestContext(request).update(
    dict(
      contentTitle='Dôme',
      request=request,
      banner="4",
      lang=request.session.get('lang', 'fr'),
    )
  )
  return render_to_response('echos2015/4.qui.html', context)


def acces(request):
  context = RequestContext(request).update(
    dict(
      request=request,
      banner="5",
      lang=request.session.get('lang', 'fr'),
    )
  )
  if context['lang'] == 'fr':
    context['contentTitle'] = 'Comment venir ?'
  else:
    context['contentTitle'] = 'Coming to échos'
  return render_to_response('echos2015/5.acces.html', context)


def resa(request):
  context = RequestContext(request).update(
    dict(
      request=request,
      banner="6",
      lang=request.session.get('lang', 'fr'),
    )
  )
  if context['lang'] == 'fr':
    context['contentTitle'] = 'Réservation'
  else:
    context['contentTitle'] = 'Tickets'
  return render_to_response('echos2015/6.reservation.html', context)


def ferme(request):
  context = RequestContext(request).update(
    dict(
      request=request,
      banner="7",
      lang=request.session.get('lang', 'fr'),
    )
  )
  if context['lang'] == 'fr':
    context['contentTitle'] = 'La ferme du Faï'
  else:
    context['contentTitle'] = 'Le Faï farm'
  return render_to_response('echos2015/7.ferme.html', context)


def trompes(request):
  context = RequestContext(request).update(
    dict(
      request=request,
      banner="8",
      lang=request.session.get('lang', 'fr'),
    )
  )
  if context['lang'] == 'fr':
    context['contentTitle'] = 'Le système acoustique'
  else:
    context['contentTitle'] = 'The acoustic system'
  return render_to_response('echos2015/8.trompes.html', context)


def zzz(request):
  context = RequestContext(request).update(
    dict(
      request=request,
      banner="9",
      lang=request.session.get('lang', 'fr'),
    )
  )
  if context['lang'] == 'fr':
    context['contentTitle'] = 'Quoi dormir / Où manger'
  else:
    context['contentTitle'] = 'Sleep / Eat'
  return render_to_response('echos2015/9.zzz.html', context)
