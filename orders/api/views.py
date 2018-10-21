from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.decorators import api_view
from .serializers import (TableListSerializer, TableDetailSerializer, 
                          OrderListSerializer, OrderDetailSerializer,
                          OrderItemListSerializer, OrderItemDetailSerializer
                        )

from ..models import Table, Order, OrderItem


@api_view(['GET'])
def ApiHomepage(request, format=None):
    return Response({
        'orders': reverse('order_list', request=request, format=format),
        'order-items': reverse('order_item_list', request=request, format=format),
        'tables': reverse('table_list', request=request, format=format),
        'products': reverse('product_list', request=request, format=format),
        'categories': reverse('category_list', request=request, format=format),
        
    })


class TableListAPIView(generics.ListAPIView):
    serializer_class = TableListSerializer
    permission_classes = [permissions.AllowAny, ]
    queryset = Table.objects.filter(active=True)


class TableDetailAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = TableDetailSerializer
    permission_classes = (permissions.AllowAny,)
    queryset = Table.objects.filter(active=True)


class OrderListAPIView(generics.ListCreateAPIView):
    serializer_class = OrderListSerializer
    permission_classes = (permissions.AllowAny, )
    queryset = Order.objects.all()


class OrderDetailAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = OrderDetailSerializer
    permission_classes = [permissions.AllowAny]
    queryset = Order.objects.all()
    lookup_field = 'id'
    lookup_url_kwarg = 'pk'


class OrderItemListAPIView(generics.ListCreateAPIView):
    serializer_class = OrderItemListSerializer
    permission_classes = (permissions.AllowAny, )
    queryset = OrderItem.objects.all()


class OrderItemDetailAPIView(generics.RetrieveDestroyAPIView):
    serializer_class = OrderItemDetailSerializer
    permission_classes = (permissions.AllowAny, )
    queryset = OrderItem.objects.all()
