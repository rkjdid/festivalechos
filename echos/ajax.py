# -*- coding: utf-8 -*-

import json
import models as m
from django.http import HttpResponse

def giveAway(request):
    mail = request.GET['mail']
    nom = request.GET['name']

    response = {}

    added = False
    existByMail = False
    existByName = False

    if len(m.Festivalier.objects.filter(email=mail)) > 0:
        existByMail = True
    if len(m.Festivalier.objects.filter(nom=nom)) > 0:
        existByName = True

    if not existByMail and not existByName:
        try:
            tarif = m.Tarif.objects.filter(tarif=0.0)[0]
            festivalier = m.Festivalier(email=mail, nom=nom, tarif=tarif)
            festivalier.save()
            added = True
        except Exception as e:
            print '[LOGSERV] %s' % e
            added = False

    if added:
        response['result'] = 'added'
        response['message'] = u'Bravo %s ! Check tes mail :)' % unicode(nom.split(' ')[0])
        import mail as mel
        import threading
        threading.Thread(None, mel.sendMail, None, (mail, nom,)).start()

    elif existByMail:
        response['result'] = 'exists'
        response['message'] = unicode(mail) + u' déjà enregistré :('
    elif existByName:
        response['result'] = 'exists'
        response['message'] = u'%s déjà enregistré :(' % (unicode(nom))
    elif not added:
        response['result'] = 'unknown'
        response['message'] = u'Oops, une erreur a surgi :/'

    return HttpResponse(json.dumps(response), mimetype='application/json; charset=utf-8')
