import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { WineCard } from '../wine-card/wine-card';
import { WineService } from '../../services/wine.service';
import { WineCategory } from '../../models/wine';
import { environment } from '../../../environments/environment';

@Component({ selector: 'app-container-wines', imports: [WineCard, RouterLink], templateUrl: './container-wines.html', })
export class ContainerWines {
  private readonly route = inject(ActivatedRoute);
  readonly catalog = inject(WineService);
  readonly imageRoot = environment.supabaseStorageUrl;
  readonly category = toSignal(this.route.data.pipe(map((data) => data['category'] as WineCategory | undefined)), {
    initialValue: this.route.snapshot.data['category'] as WineCategory | undefined,
  });
  readonly wines = computed(() => {
    const category = this.category();
    return this.catalog.wines().filter((wine) => !category || wine.category === category);
  });
  readonly collectionTitle = computed(() => {
    const category = this.category();
    return category === 'red' ? 'Vinhos tintos' : category === 'white' ? 'Vinhos brancos' : category === 'rose' ? 'Vinhos rosés' : 'Coleção de vinhos WWW';
  });

  constructor() { this.catalog.loadWines(); }
}
