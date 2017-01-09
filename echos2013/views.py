# -*- coding: utf-8 -*-
from django.shortcuts import render_to_response
from django.template.context import RequestContext


def home(request):
	context = RequestContext(request).update(
		dict(
			request=request,
		)
	)
	return render_to_response('echos2013/0.home.html', context)

def presentation(request):
	context = RequestContext(request).update(
		dict(
			contentTitle='présentation',
			request=request,
			banner="1"
		)
	)
	return render_to_response('echos2013/1.presentation.html', context)

def contact(request):
	context = RequestContext(request).update(
		dict(
			contentTitle='contact',
			request=request,
			banner="2"
		)
	)
	return render_to_response('echos2013/2.contact.html', context)

def progra(request):
	context = RequestContext(request).update(
		dict(
			contentTitle='programmation',
			request=request,
			banner="3"
		)
	)
	return render_to_response('echos2013/3.programmation.html', context)

def qui(request):
	context = RequestContext(request).update(
		dict(
			contentTitle='qui sommes-nous ?',
			request=request,
			banner="4",
			page="qui"
		)
	)
	return render_to_response('echos2013/4.qui.html', context)

def acces(request):
	context = RequestContext(request).update(
		dict(
			contentTitle='comment venir ?',
			request=request,
			banner="5"
		)
	)
	return render_to_response('echos2013/5.acces.html', context)

def resa(request):
	context = RequestContext(request).update(
		dict(
			contentTitle='réservation',
			request=request,
			banner="6"
		)
	)
	return render_to_response('echos2013/6.reservation.html', context)

def ferme(request):
	context = RequestContext(request).update(
		dict(
			contentTitle='la ferme du faï',
			request=request,
			banner="7"
		)
	)
	return render_to_response('echos2013/7.ferme.html', context)


def trompes(request):
	context = RequestContext(request).update(
		dict(
			contentTitle='le système acoustique',
			request=request,
			banner="8"
		)
	)
	return render_to_response('echos2013/8.trompes.html', context)


def zzz(request):
	context = RequestContext(request).update(
		dict(
			contentTitle='quoi dormir / où manger',
			request=request,
			banner="9"
		)
	)
	return render_to_response('echos2013/9.zzz.html', context)
