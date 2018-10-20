from  rest_framework import generics, permissions
from products.models import Product, Category
from .serializers import ProductListSerializer, ProductDetailSerializer, CategoryListSerializer


class ProductListAPIView(generics.ListAPIView):
    serializer_class = ProductListSerializer
    permission_classes = (permissions.AllowAny, )
    queryset = Product.objects.filter(active=True)


class ProductDetailAPIView(generics.RetrieveAPIView):
    serializer_class = ProductDetailSerializer
    permission_classes = (permissions.AllowAny, )
    queryset = Product.objects.filter(active=True)


class CategoryListApiView(generics.ListAPIView):
    serializer_class = CategoryListSerializer
    permission_classes = (permissions.AllowAny, )
    queryset = Product.objects.filter(active=True)