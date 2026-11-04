import { Injectable, inject, signal } from '@angular/core';
import { catchError, finalize, map, Observable, of, tap } from 'rxjs';
import { Wine } from '../models/wine';
import { DatabaseService } from './database';

@Injectable({ providedIn: 'root' })
export class WineService {
  private readonly database = inject(DatabaseService);

  readonly wines = signal<Wine[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  loadWines(): void {
    this.loading.set(true);
    this.error.set(null);

    this.database
      .getAll<Wine>('wines')
      .pipe(
        map((rows) => rows ?? []),
        tap((rows) => this.wines.set(rows)),
        catchError((err) => {
          this.error.set('Não foi possível carregar os vinhos no momento.');
          console.error(err);
          return of([] as Wine[]);
        }),
        finalize(() => this.loading.set(false))
      )
      .subscribe();
  }

  createWine(payload: Partial<Wine>): Observable<Wine> {
    return this.database.insert<Wine>('wines', payload).pipe(
      map((rows) => rows[0] ?? (payload as Wine))
    );
  }

  deleteWine(id: number | string): Observable<void> {
    return this.database.delete('wines', 'id', id);
  }

  addToCatalog(wine: Wine): void {
    this.wines.update((current) => [...current, wine]);
  }

  removeFromCatalog(id: number | string): void {
    this.wines.update((current) => current.filter((wine) => String(wine.id) !== String(id)));
  }
}
