from rest_framework import serializers

from cuevana.models import Pelicula, Persona, Reparto


class PeliculaSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pelicula
        fields = ('id', 'titulo', 'imagen_pelicula')


class PersonaSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Persona
        fields = ('id', 'nombre', 'imagen_persona')