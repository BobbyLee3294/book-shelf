from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404, redirect, render
from bookshelf.models import Book, Bookshelf
from points.models import Achievement, UserPoints

# Create your views here


@login_required
def add_book_to_bookshelf(request, book_id, bookshelf_id):
    book = get_object_or_404(Book, pk=book_id)
    bookshelf = get_object_or_404(
        Bookshelf, pk=bookshelf_id, created_by=request.user)

    # Add the book to the bookshelf
    bookshelf.list_of_books.add(book)

    # Check if the user has achieved having 20 books in one bookshelf
    if bookshelf.list_of_books.count() == 20:
        achievement = Achievement.objects.get(name='20 Books in One Bookshelf')
        request.user.achievements.add(achievement)

    # Award the user 5 points for adding a book to their bookshelf
    user_points, created = UserPoints.objects.get_or_create(user=request.user)
    user_points.points += 5
    user_points.save()

    return redirect('bookshelf_detail', pk=bookshelf_id)
