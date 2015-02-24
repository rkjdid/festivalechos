# -*- coding: utf-8 -*-
from urllib2 import Request
from django.shortcuts import render_to_response, redirect, render
from django.template.context import RequestContext
from django.http import HttpResponse

import models as m

def home(request):
    return render_to_response(
        '0.home.html',
        context_instance=RequestContext(request)
    )


def presentation(request):
    params = dict(
        contentTitle ='présentation',
        request=request,
        banner= "1"
    )

    return render_to_response(
        '1.presentation.html',
        params,
        context_instance=RequestContext(request)
    )

def contact(request):
    params = dict(
        contentTitle ='contact',
        request = request,
        banner= "2"
    )

    return render_to_response(
        '2.contact.html',
        params,
        context_instance=RequestContext(request)
    )

def progra(request):
    params = dict(
        contentTitle ='programmation',
        request=request,
        banner="3"
    )

    return render_to_response(
        '3.programmation.html',
        params,
        context_instance=RequestContext(request)
    )

def qui(request):
    params = dict(
        contentTitle ='qui sommes-nous ?',
        request = request,
        banner = "4",
        page = "qui"
    )

    return render_to_response(
        '4.qui.html',
        params,
        context_instance = RequestContext(request)
    )

def acces(request):
    params = dict(
        contentTitle ='comment venir ?',
        request = request,
        banner = "5"
    )

    return render_to_response(
        '5.acces.html',
        params,
        context_instance = RequestContext(request)
    )

def resa(request):
    params = dict(
        contentTitle ='réservation',
        request=request,
        banner = "6"
    )

    return render_to_response(
        '6.reservation.html',
        params,
        context_instance=RequestContext(request)
    )

def ferme(request):
    params = dict(
        contentTitle ='la ferme du faï',
        request=request,
        banner = "7"
    )

    return render_to_response(
        '7.ferme.html',
        params,
        context_instance=RequestContext(request)
    )

def trompes(request):
    params = dict(
        contentTitle ='le système acoustique',
        request=request,
        banner = "8"
    )

    return render_to_response(
        '8.trompes.html',
        params,
        context_instance=RequestContext(request)
    )

def zzz(request):
    params = dict(
        contentTitle ='quoi dormir / où manger',
        request=request,
        banner = "9"
    )

    return render_to_response(
        '9.zzz.html',
        params,
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
        context_instance = RequestContext(request)
    )

def redirectModalites(request):
    return redirect(
        '/modalites/acces',
        context_instance = RequestContext(request)
    )

def redirectQui(request):
    return redirect(
        '/dome',
        context_instance = RequestContext(request)
    )

def redirectContact (request):
    return redirect(
        '/contact',
        context_instance = RequestContext(request)
    )

def redirectAdmin(request):
    return redirect(
        '/underground/',
        context_instance = RequestContext(request)
    )
