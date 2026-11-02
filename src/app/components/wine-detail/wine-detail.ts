import { Component, computed, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { WineService } from '../../services/wine.service';

@Component({ selector: 'app-wine-detail', imports: [RouterLink, DecimalPipe], templateUrl: './wine-detail.html', })
export class WineDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly catalog = inject(WineService);
  readonly cart = inject(CartService);
  readonly wine = computed(() => this.catalog.wines().find((item) => String(item.id) === this.route.snapshot.paramMap.get('id')));

  constructor() { this.catalog.loadWines(); }
}
