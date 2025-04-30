from django.db import models


class Persona(models.Model):
    imagen_persona = models.ImageField(upload_to='static/personas', null=True, blank=True)
    nombre = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre
