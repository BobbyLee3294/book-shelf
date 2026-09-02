from django.urls import path
from points import views

urlpatterns = [
    path('shelf_achievements', views.add_book_to_bookshelf),
]
