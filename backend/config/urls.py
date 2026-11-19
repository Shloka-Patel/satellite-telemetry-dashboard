from django.urls import path
from telemetry import views

urlpatterns = [
    path("api/telemetry/<str:satellite>/", views.telemetry),
]