from django.db import models
from django.db.models import Sum
from products.models import Product


class Table(models.Model):
    active  = models.BooleanField(default=True)
    title = models.CharField(unique=True, max_length=150)
    is_free = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.title}'


class Order(models.Model):
    active = models.BooleanField(default=True)
    title = models.CharField(blank=True, null=True, max_length=50)
    value = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    table = models.ForeignKey(Table, null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return f'Table {self.table.title}' if self.table else 'Table'

    def save(self, *args, **kwargs):
        self.value = self.order_items.all().aggregate(Sum('total_value'))['total_value__sum'] if self.order_items else 0
        super(Order, self).save(*args, **kwargs)
    

class OrderItem(models.Model):
    product_related = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='order_items')
    order_related = models.ForeignKey(Order, on_delete=models.CASCADE)
    price = models.DecimalField(decimal_places=2, max_digits=10, default=0)
    qty = models.PositiveIntegerField(defaut=1)
    total_value = models.DecimalField(decimal_places=2, max_digits=10, default=0)

    def __str__(self):
        return f'{self.product_related.title}'

    def save(self, *args, **kwargs):
        self.price = self.product_related.price
        self.total_value = self.price * self.qty
        super(OrderItem, self).save(*args, **kwargs)
        self.order_related.save()