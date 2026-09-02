from authentication.models import User
from django.db import models


class Achievement(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    points = models.PositiveIntegerField(default=0)
    target_books = models.PositiveBigIntegerField(
        default=0, blank=True, null=True)
    target_comments = models.PositiveBigIntegerField(
        default=0, blank=True, null=True)
    target_bookshelves = models.PositiveBigIntegerField(
        default=0, blank=True, null=True)

    def __str__(self):
        return self.name


class UserAchievement(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='achievements')
    achievement = models.ForeignKey(Achievement, on_delete=models.CASCADE)
    date_achieved = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.achievement.name}"


class Action(models.Model):
    name = models.CharField(max_length=255)
    points = models.IntegerField()

    def __str__(self):
        return self.name


class UserAction(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='actions')
    action = models.ForeignKey(Action, on_delete=models.CASCADE)
    count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.user.username} - {self.action.name}"


class UserPoints(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    action = models.CharField(max_length=50)
    points = models.IntegerField(default=0)
    achievement = models.ForeignKey(
        Achievement, null=True, blank=True, on_delete=models.SET_NULL)
