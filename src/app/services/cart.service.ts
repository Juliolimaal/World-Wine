import { computed, signal } from '@angular/core';
import { Service } from '../services/service';
import { CartItem } from '../models/cart-item';
import { Wine } from '../models/wine';

const STORAGE_KEY = 'jk_cart';

@Service()
export class CartService {
  readonly items = signal<CartItem[]>(this.readCart());
  readonly isOpen = signal(false);
  readonly count = computed(() => this.items().reduce((sum, item) => sum + item.quantity, 0));
  readonly total = computed(() => this.items().reduce((sum, item) => sum + item.price * item.quantity, 0));

  add(wine: Wine): void {
    this.items.update((items) => {
      const found = items.find((item) => String(item.id) === String(wine.id));
      return found
        ? items.map((item) => String(item.id) === String(wine.id) ? { ...item, quantity: item.quantity + 1 } : item)
        : [...items, { ...wine, quantity: 1 }];
    });
    this.persist();
    this.isOpen.set(true);
  }

  remove(id: number | string): void {
    this.items.update((items) => items.filter((item) => String(item.id) !== String(id)));
    this.persist();
  }

  clear(): void {
    this.items.set([]);
    this.persist();
  }

  private readCart(): CartItem[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) as CartItem[] : [];
    } catch {
      return [];
    }
  }

  private persist(): void {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items())); } catch { /* armazenamento local indisponível */ }
  }
}
