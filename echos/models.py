##-*- coding: utf-8 -*-

from django.db import models

class Festivalier (models.Model):
    email = models.CharField (max_length=120)
    nom = models.CharField(max_length=40)

    tarif = models.ForeignKey('Tarif', related_name='festivaliers')

    def __unicode__(self):
        return u'[%s€]/' % self.tarif.tarif + '%s' % self.nom


class Tarif (models.Model):
    nom = models.CharField(max_length=40)
    tarif = models.FloatField()

    def __unicode__(self):
        return u'#%d-%s[%s€]' % (self.id, self.nom, str(self.tarif))