from django.contrib import admin
from django.urls import path

from orders.api.views import TableListView, TableDetailView

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/table-list/', TableListView.as_view(), name='table_list'),
    path('api/table-detail/<int:pk>/', TableDetailView.as_view(), name='table_detail')

]
