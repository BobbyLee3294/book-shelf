from django.contrib import admin
from .models import Bookshelf, Book

# Register your models here.
admin.site.register(Bookshelf)
admin.site.register(Book)
