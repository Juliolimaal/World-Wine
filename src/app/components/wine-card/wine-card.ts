import { Component, Input, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Wine } from '../../models/wine';
import { CartService } from '../../services/cart.service';
import { environment } from '../../../environments/environment';

@Component({ selector: 'app-wine-card', imports: [RouterLink, DecimalPipe], templateUrl: './wine-card.html', })
export class WineCard {
  @Input({ required: true }) wine!: Wine;
  readonly cart = inject(CartService);
  readonly imageRoot = environment.supabaseStorageUrl;
}
