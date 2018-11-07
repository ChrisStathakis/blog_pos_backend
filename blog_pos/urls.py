from django.contrib import admin
from django.urls import path
from rest_framework.authtoken import views

from orders.api.views import (TableListAPIView, TableDetailAPIView,
                              OrderListAPIView, OrderDetailAPIView,  
                              OrderItemListAPIView, OrderItemDetailAPIView,
                              ApiHomepage, ReportOrderApiView,
                              TableListApiAuthView  
                            )   

from products.api.views import ProductListAPIView, ProductDetailAPIView, CategoryListApiView,ProductListApiAuthView

urlpatterns = [
    path('admin/', admin.site.urls),

    path('auth/', views.obtain_auth_token,),
    path('api/', ApiHomepage),
    path('api/table-list/', TableListAPIView.as_view(), name='table_list'),
    path('api/table-detail/<int:pk>/', TableDetailAPIView.as_view(), name='table_detail'),
    path('api/order-list/', OrderListAPIView.as_view(), name='order_list'),
    path('api/order-detail/<int:pk>/', OrderDetailAPIView.as_view(), name='order_detail'),
    path('api/order-item-list', OrderItemListAPIView.as_view(), name='order_item_list'),
    path('api/order-item-detail/<int:pk>/', OrderItemDetailAPIView.as_view(), name='order_item_detail'),

    path('api/product-list/', ProductListAPIView.as_view(), name='product_list'),
    path('api/product-detail/<int:pk>/', ProductDetailAPIView.as_view(), name='product_detail'),
    path('api/category-list/', CategoryListApiView.as_view(), name='category_list'),
    path('api/orders/reports/', ReportOrderApiView),

    path('api/auth/products/', ProductListApiAuthView.as_view(), name='product_auth_view'),
    path('api/auth/tables', TableListApiAuthView.as_view(), name='tables_auth_view' )
    
    

]
