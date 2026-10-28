import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductCard } from '../../components/product-card/product-card';
@Component({ selector:'app-home', imports:[ProductCard], templateUrl:'./home.html', styleUrl:'./home.scss' })
export class Home { readonly products = inject(ProductService).products; }
