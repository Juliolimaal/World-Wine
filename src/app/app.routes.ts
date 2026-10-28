import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then(m => m.Home) },
  { path: 'red', loadComponent: () => import('./pages/catalog/catalog').then(m => m.Catalog), data: { type: 'Tinto' } },
  { path: 'rose', loadComponent: () => import('./pages/catalog/catalog').then(m => m.Catalog), data: { type: 'Rosé' } },
  { path: 'white', loadComponent: () => import('./pages/catalog/catalog').then(m => m.Catalog), data: { type: 'Branco' } },
  { path: 'cart', loadComponent: () => import('./pages/cart/cart').then(m => m.Cart) },
  { path: 'pagamento', loadComponent: () => import('./pages/checkout/checkout').then(m => m.Checkout) },
  { path: '**', redirectTo: '' }
];
