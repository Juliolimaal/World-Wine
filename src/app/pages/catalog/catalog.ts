import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductCard } from '../../components/product-card/product-card';
@Component({ selector:'app-catalog', imports:[ProductCard], templateUrl:'./catalog.html', styleUrl:'./catalog.scss' })
export class Catalog {
  private readonly service = inject(ProductService);
  readonly type = inject(ActivatedRoute).snapshot.data['type'] as string;
  readonly products = computed(() => this.service.products().filter(product => product.type === this.type));
}
