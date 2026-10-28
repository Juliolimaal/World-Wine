import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart-item.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly itemsState = signal<CartItem[]>([]);
  readonly items = this.itemsState.asReadonly();
  readonly count = computed(() => this.items().reduce((sum, item) => sum + item.quantity, 0));
  readonly total = computed(() => this.items().reduce((sum, item) => sum + item.quantity * item.product.price, 0));

  add(product: Product): void {
    this.itemsState.update(items => {
      const existing = items.find(item => item.product.id === product.id);
      return existing
        ? items.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...items, { product, quantity: 1 }];
    });
  }

  remove(id: string): void {
    this.itemsState.update(items => items.filter(item => item.product.id !== id));
  }
}
