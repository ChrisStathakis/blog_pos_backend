from django.contrib import admin
from .models import Product, Category


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'tag_price', 'active']
    list_filter = ['active', 'category', ]
    readonly_fields = ['tag_price', ]
    search_fields = ['title', 'category__title']


admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_filter = ['active',]
