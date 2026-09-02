from pytz import timezone
from rest_framework import serializers
from .models import Bookshelf, Book


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'book_info', 'bookshelves']


class BookshelfSerializer(serializers.ModelSerializer):
    list_of_books = BookSerializer(many=True, read_only=True)

    class Meta:
        model = Bookshelf
        fields = ['id', 'name', 'description', 'date_created',
                  'date_updated', 'total_books', 'list_of_books', 'created_by']
        # depth = 1
