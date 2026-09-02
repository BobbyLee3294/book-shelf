import json
from django.db import models
from authentication.models import User
# Create your models here.


class Bookshelf(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    total_books = models.PositiveIntegerField(default=0)
    list_of_books = models.ManyToManyField(
        'Book', related_name='bookContainer', blank=True)
    created_by = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='bookshelves')

    def __str__(self):
        book_titles = [book.title for book in self.list_of_books.all()]
        return f"{self.created_by} - {self.name} ({', '.join(book_titles)})"


class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    book_info = models.JSONField(default=dict)
    bookshelves = models.ManyToManyField(
        'Bookshelf', related_name='books', blank=True)

    def __str__(self) -> str:
        return self.title

    def save(self, *args, **kwargs):
        print('saved')
        super().save(*args, **kwargs)
        for bookshelf in self.bookshelves.all():
            bookshelf.total_books = bookshelf.list_of_books.count()
            bookshelf.save()
