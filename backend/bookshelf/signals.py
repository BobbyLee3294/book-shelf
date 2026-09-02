from django.db.models.signals import m2m_changed
from django.dispatch import receiver
from .models import Bookshelf


@receiver(m2m_changed, sender=Bookshelf.list_of_books.through)
def update_total_books(sender, instance, action, **kwargs):
    if action == 'post_add' or action == 'post_remove':
        instance.total_books = instance.list_of_books.count()
        instance.save()
