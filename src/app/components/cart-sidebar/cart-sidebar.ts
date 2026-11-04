import { Component, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-sidebar',
  imports: [DecimalPipe, RouterLink, ReactiveFormsModule],
  templateUrl: './cart-sidebar.html',
})
export class CartSidebar {
  private readonly route = inject(ActivatedRoute);
  private readonly formBuilder = inject(FormBuilder);
  readonly cart = inject(CartService);
  readonly viewMode = this.route.snapshot.data['page'] === 'payment' ? 'payment' : this.route.snapshot.data['page'] === true ? 'cart' : 'sidebar';
  readonly pageMode = this.viewMode !== 'sidebar';
  readonly paymentMode = this.viewMode === 'payment';
  readonly brand = signal('Cartão');
  readonly completed = signal(false);
  readonly form = this.formBuilder.nonNullable.group({
    cardNumber: ['', [Validators.required, Validators.minLength(16)]],
    holder: ['', Validators.required],
    expiry: ['', [Validators.required, Validators.minLength(5)]],
    cvc: ['', [Validators.required, Validators.minLength(3)]],
  });

  updateBrand(event: Event): void {
    const number = (event.target as HTMLInputElement).value.replace(/\D/g, '');
    this.brand.set(number.startsWith('4') ? 'Visa' : /^5[1-5]/.test(number) ? 'Mastercard' : /^3[47]/.test(number) ? 'Amex' : /^(4011|4389|4514|4576|5041|5066|5090|6277|6362|6363|650|6516|6550)/.test(number) ? 'Elo' : 'Cartão');
  }

  submitPayment(): void {
    if (this.form.invalid || this.cart.count() === 0) {
      this.form.markAllAsTouched();
      return;
    }
    this.completed.set(true);
    this.cart.clear();
    this.form.reset();
  }
}
