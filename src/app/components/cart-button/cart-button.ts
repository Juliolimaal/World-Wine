import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-button',
  templateUrl: './cart-button.html',
})
export class CartButton {
  readonly cart = inject(CartService);
}
