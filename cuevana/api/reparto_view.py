from rest_framework import serializers, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from cuevana.api import PersonaSimpleSerializer, PeliculaSimpleSerializer
from cuevana.models import Reparto, Persona, Pelicula


class RepartoSerializer(serializers.ModelSerializer):
    persona = PersonaSimpleSerializer(read_only=True)
    pelicula = PeliculaSimpleSerializer(read_only=True)

    persona_id = serializers.PrimaryKeyRelatedField(
        queryset=Persona.objects.all(),
        source='persona',
        write_only=True
    )
    pelicula_id = serializers.PrimaryKeyRelatedField(
        queryset=Pelicula.objects.all(),
        source='pelicula',
        write_only=True
    )

    class Meta:
        model = Reparto
        fields = ('id', 'roles', 'pelicula', 'persona', 'persona_id', 'pelicula_id')


class RepartoViewSet(viewsets.ModelViewSet):
    serializer_class = RepartoSerializer
    queryset = Reparto.objects.all()

    # @action(detail=True, methods=['get'], url_path='pelicula')
    # def get_reparto_por_pelicula(self, request, pk=None):
    #     try:
    #         pelicula = Pelicula.objects.get(pk=pk)
    #         repartos = Reparto.objects.filter(pelicula=pelicula)
    #         serializer = self.get_serializer(repartos, many=True)
    #         return Response(serializer.data)
    #     except Pelicula.DoesNotExist:
    #         return Response({"detail": "Pelicula no encontrada."}, status=404)
