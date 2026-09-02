from rest_framework import serializers
from .models import Comment


class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ['id', 'text_body', 'created_on',
                  'likes', 'dislikes', 'parent']
        depth = 1
