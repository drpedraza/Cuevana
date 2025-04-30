from django.db import models

from cuevana.models import Pelicula, Persona


class Reparto(models.Model):
    TIPO_DIRECTOR = 1
    TIPO_ACTOR = 2
    TIPO_CHOICES = (
        (TIPO_DIRECTOR, 'Director'),
        (TIPO_ACTOR, 'Actor')
    )
    roles = models.IntegerField(
        choices=TIPO_CHOICES
    )
    pelicula = models.ForeignKey(
        Pelicula,
        on_delete=models.CASCADE,
        related_name='reparto'
    )
    persona = models.ForeignKey(
        Persona,
        on_delete=models.CASCADE,
        related_name='reparto'
    )

    def __str__(self):
        return f'{self.persona} - {self.roles}'