from django.db import models

from authentication.models import User
# Create your models here.


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text_body = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)
    likes = models.IntegerField(default=0)
    dislikes = models.IntegerField(default=0)
    parent = models.ForeignKey(
        'self', null=True, blank=True, on_delete=models.CASCADE, related_name='replies')

    class Meta:
        ordering = ['created_on']

    def __str__(self):
        return 'Comment {} by {}'.format(self.text_body, User.first_name)

    # this filters all the replies of the comments
    @property
    def children(self):
        return Comment.objects.filter(parent=self).reverse()

    # this makes the comment either a parent comment or a reply
    @property
    def is_parent(self):
        if self.parent is None:
            return True
        return False
