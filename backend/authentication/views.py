from bookshelf.models import Bookshelf
from django.contrib.auth import get_user_model
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import MyTokenObtainPairSerializer, RegistrationSerializer

User = get_user_model()


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegistrationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        bookshelf1 = Bookshelf.objects.create(
            name='Read', description='Books that you have read.', created_by=user)
        bookshelf2 = Bookshelf.objects.create(
            name='Favorites', description='Books that you love.', created_by=user)
        bookshelf3 = Bookshelf.objects.create(
            name='Reading List', description='Books that are currently reading or you want to read.', created_by=user)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
