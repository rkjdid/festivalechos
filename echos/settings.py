# -*- coding: utf-8 -*-
from __future__ import print_function, unicode_literals

import os.path, sys
from django.core.exceptions import ImproperlyConfigured

try:
  from _debug import *
except:
  pass

# some weird fix about adminsite...
FORCE_SCRIPT_NAME = ''

try:
  import _paths
except:
  print("MEDIA_ROOT STATIC_ROOT HOME_URL "
        "need to be defined in paths.py", file=sys.stderr)
  raise ImproperlyConfigured("_paths.py missing")

STATIC_ROOT = _paths.STATIC_ROOT
MEDIA_ROOT = _paths.MEDIA_ROOT
HOME_URL = _paths.HOME_URL

PROJECT_NAME = 'echos'
ALLOWED_HOSTS = [
  '.localhost',
  '.192.168.1.1',
  '.festivalechos.fr',
  '.2015.festivalechos.fr',
]
INTERNAL_IPS = [
  '127.0.0.1',
  '192.168.1.1',
  '192.168.1.121',
  '192.168.1.217'
]

BASE_PATH = os.path.dirname(__file__)
PROJECT_PATH = os.path.dirname(BASE_PATH)

ADMINS = (
  ('rk', 'rk@jdid.co'),
)
MANAGERS = ADMINS

SITE_ID = 1

try:
  import _credentials
except:
  print("DB_BACKEND DB_NAME DB_USER DB_PASS DB_HOST DB_PORT SECRET_KEY "
        "need to be defined in credentials.py", file=sys.stderr)
  raise ImproperlyConfigured("_credentials.py missing")

SERVER_EMAIL = _credentials.SERVER_EMAIL
SECRET_KEY = _credentials.SECRET_KEY
DATABASES = {
  'default': {
    'ENGINE': _credentials.DB_BACKEND,
    'NAME': _credentials.DB_NAME,
    'USER': _credentials.DB_USER,
    'PASSWORD': _credentials.DB_PASS,
    'HOST': _credentials.DB_HOST,
    'PORT': _credentials.DB_PORT,
  }
}

ROOT_URLCONF = 'echos.urls'
WSGI_APPLICATION = 'echos.wsgi.application'

MEDIA_URL = '/media/'
STATIC_URL = '/static/'
STATICFILES_DIRS = ()

MIDDLEWARE_CLASSES = (
  'django.contrib.sessions.middleware.SessionMiddleware',
  'echos.domain.DomainMiddleware',
  'django.middleware.common.CommonMiddleware',
  'django.middleware.csrf.CsrfViewMiddleware',
  'django.contrib.auth.middleware.AuthenticationMiddleware',
  'django.contrib.messages.middleware.MessageMiddleware',
  'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

TEMPLATE_DIRS = ()

INSTALLED_APPS = (
  'django.contrib.admin',
  'django.contrib.auth',
  'django.contrib.contenttypes',
  'django.contrib.sessions',
  'django.contrib.messages',
  'django.contrib.staticfiles',

  'echos',
)

# A sample logging configuration. The only tangible logging
# performed by this configuration is to send an emai
# the site admins on every HTTP 500 error.
# See http://docs.djangoproject.com/en/dev/topics/logging forl to
# more details on how to customize your logging configuration.
LOGGING = {
  'version': 1,
  'disable_existing_loggers': False,
  'handlers': {
    'mail_admins': {
      'level': 'ERROR',
      'filters': [],
      'class': 'django.utils.log.AdminEmailHandler'
    }
  },
  'loggers': {
    'django.request': {
      'handlers': ['mail_admins'],
      'level': 'ERROR',
      'propagate': True,
    },
  }
}

DEFAULT_CHARSET = 'utf-8'
TIME_ZONE = 'Europe/Paris'
LANGUAGE_CODE = 'fr-FR'
USE_I18N = True
USE_L10N = True

AVAILABLE_LANGUAGES = (
  'fr',
  'en'
)
CURRENT_LANGUAGE = 'fr'
