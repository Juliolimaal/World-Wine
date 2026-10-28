import { Component, inject, input } from '@angular/core';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';

@Component({ selector:'app-product-card', templateUrl:'./product-card.html', styleUrl:'./product-card.scss' })
export class ProductCard {
  readonly product = input.required<Product>();
  readonly cart = inject(CartService);
}
