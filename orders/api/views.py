from rest_framework import generics, permissions
from rest_framework.response import Response
from .serializers import (TableListSerializer, TableDetailSerializer, 
                          OrderListSerializer, OrderDetailSerializer,
                          OrderItemListSerializer, OrderItemDetailSerializer
                        )

from ..models import Table


class TableListView(generics.ListAPIView):
    serializer_class = TableListSerializer
    permission_classes = [permissions.AllowAny, ]
    queryset = Table.objects.filter(active=True)


class TableDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = TableDetailSerializer
    permission_classes = (permissions.AllowAny,)
    queryset = Table.objects.filter(active=True)


class OrderListView(generics.ListCreateAPIView):
    
