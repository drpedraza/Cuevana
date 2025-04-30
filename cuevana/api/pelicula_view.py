from rest_framework import serializers, viewsets

from cuevana.models import Pelicula


class PeliculaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pelicula
        fields = '__all__'


class PeliculaViewSet(viewsets.ModelViewSet):
    serializer_class = PeliculaSerializer
    queryset = Pelicula.objects.order_by('-clasificacion_rotten')

    def get_queryset(self):
        queryset = super().get_queryset()
        search_query = self.request.query_params.get('search', None)
        if search_query:
            queryset = queryset.filter(titulo__icontains=search_query)
        return queryset