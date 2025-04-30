from rest_framework.routers import DefaultRouter

from cuevana.api import UserViewSet, PeliculaViewSet, PersonaViewSet
from cuevana.api.reparto_view import RepartoViewSet

router = DefaultRouter()
router.register(r'auth', UserViewSet, basename='auth')
router.register(r'pelicula', PeliculaViewSet, basename='peliculas')
router.register(r'persona', PersonaViewSet, basename='personas')
router.register(r'reparto', RepartoViewSet, basename='repartos')
urlpatterns = router.urls
