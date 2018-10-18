from django.shortcuts import render
from django.views.generic import ListView
from  orders.models import Table

class Homepage(ListView):
    template_name = ''
    model = Table

    def get_queryset(self):
        queryset = Table.objects.filter(active=True)
        return queryset


def order_detail(request, pk):
    pass