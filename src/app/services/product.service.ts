import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  readonly products = signal<Product[]>([
    { id:'red-vitalo', name:'Vitalo', type:'Tinto', price:99.90, image:'/images/image-wine-red-vitalo.png' },
    { id:'red-alesia', name:'Alesia', type:'Tinto', price:109.90, image:'/images/image-wine-red-alesia.png' },
    { id:'red-larnache', name:'Larnache', type:'Tinto', price:119.90, image:'/images/image-wine-red-larnache.png' },
    { id:'rose-fresh', name:'Fresh Rosé', type:'Rosé', price:89.90, image:'/images/image-wine-fresh-rose.png' },
    { id:'white-luz', name:'Da Luz', type:'Branco', price:95.90, image:'/images/image-wine-da-luz.png' }
  ]);
}
