from django.db import models


class Plate(models.Model):

    number = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    model = models.CharField(max_length=255)
    manufacturer = models.CharField(max_length=255)
    color = models.CharField(max_length=255)
    year = models.CharField(max_length=255)
