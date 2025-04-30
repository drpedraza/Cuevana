from django.db import models

class Pelicula(models.Model):
    titulo = models.CharField(max_length=100)
    sinopsis = models.CharField(max_length=100)
    fecha_lanzamiento = models.DateField()
    clasificacion_rotten = models.IntegerField()
    video_url = models.CharField(max_length=100)
    imagen_pelicula = models.ImageField(upload_to='static/peliculas', null=True, blank=True)

    def __str__(self):
        return self.titulo