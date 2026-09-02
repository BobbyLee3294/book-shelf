from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import Book, Bookshelf
from .serializers import BookshelfSerializer

# Create your views here.


@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_bookshelves(request):
    bookshelves = Bookshelf.objects.all()
    serializer = BookshelfSerializer(bookshelves, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET', 'POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def user_bookshelves(request):
    user_bookshelf = Bookshelf.objects.filter(created_by_id=request.user.id)
    if request.method == 'POST':
        serializer = BookshelfSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(created_by=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        serializer = BookshelfSerializer(user_bookshelf, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        user_bookshelf.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def bookshelf_detail(request, bookshelf_id):
    bookshelf = Bookshelf.objects.get(id=bookshelf_id)
    if request.method == 'GET':
        serializer = BookshelfSerializer(bookshelf, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    if request.method == 'PUT':
        serializer = BookshelfSerializer(bookshelf, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_book_to_bookshelf(request, bookshelf_id):
    bookshelf = get_object_or_404(
        Bookshelf, id=bookshelf_id, created_by=request.user)
    book_data = request.data
    title = book_data.get('title', '').strip()
    author = book_data.get('author', '').strip() or 'Unknown author'

    if not title:
        return Response(
            {'detail': 'A book title is required.'},
            status=status.HTTP_400_BAD_REQUEST)

    book_info = book_data.get('book_info', {})
    book_key = book_info.get('key')
    book = Book.objects.filter(book_info__key=book_key).first() if book_key else None
    if book is None:
        book = Book.objects.create(
            title=title, author=author, book_info=book_info)

    bookshelf.list_of_books.add(book)
    bookshelf.total_books = bookshelf.list_of_books.count()
    bookshelf.save(update_fields=['total_books', 'date_updated'])

    return Response(
        {'book': book.title, 'bookshelf': bookshelf.name},
        status=status.HTTP_201_CREATED)
