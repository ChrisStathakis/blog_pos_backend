from django_filters.rest_framework import  DjangoFilterBackend
from rest_framework import generics, permissions , filters
from products.models import Product, Category
from .serializers import ProductListSerializer, ProductDetailSerializer, CategoryListSerializer


class ProductListAPIView(generics.ListCreateAPIView):
    serializer_class = ProductListSerializer
    permission_classes = (permissions.AllowAny, )
    queryset = Product.objects.filter(active=True)
    filter_backends = (DjangoFilterBackend, filters.SearchFilter)
    filter_fields = ('category',)
    search_fields = ['title', 'category__title']


class ProductDetailAPIView(generics.RetrieveAPIView):
    serializer_class = ProductDetailSerializer
    permission_classes = (permissions.AllowAny, )
    queryset = Product.objects.filter(active=True)


class CategoryListApiView(generics.ListAPIView):
    serializer_class = CategoryListSerializer
    permission_classes = (permissions.AllowAny, )
    queryset = Category.objects.filter(active=True)


class ProductListApiAuthView(generics.ListAPIView):
    serializer_class = ProductListSerializer
    permission_classes = (permissions.IsAuthenticated, )
    queryset = Product.objects.all()