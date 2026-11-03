import { Routes } from '@angular/router';
import { ContainerWines } from './components/container-wines/container-wines';
import { WineDetail } from './components/wine-detail/wine-detail';

export const routes: Routes = [
  { path: '', component: ContainerWines, title: 'World Wines' },
  {
    path: 'red',
    component: ContainerWines,
    data: { category: 'red' },
    title: 'Vinhos tintos'
  },
  {
    path: 'white',
    component: ContainerWines,
    data: { category: 'white' },
    title: 'Vinhos brancos'
  },
  {
    path: 'rose',
    component: ContainerWines,
    data: { category: 'rose' },
    title: 'Vinhos rosés'
  },
  {
    path: 'vinhos/:id',
    component: WineDetail,
    title: 'Detalhes do vinho'
  },
  { path: '**', redirectTo: '' }
];