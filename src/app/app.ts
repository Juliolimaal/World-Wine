import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CartButton } from './components/cart-button/cart-button';
import { CartSidebar } from './components/cart-sidebar/cart-sidebar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CartButton, CartSidebar],
  templateUrl: './app.html',
  styleUrl: './app.css',
  host: { class: 'block min-h-screen bg-[#fdfbf7] text-[#310729]' },
})
export class App {}
