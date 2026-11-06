import { Service, inject, signal } from '@angular/core';
import { Observable, catchError, finalize, map, of } from 'rxjs';
import { Wine, WineCategory } from '../models/wine';
import { DatabaseService } from './database';
import { environment } from '../../environments/environment';

const IMAGE_ROOT = environment.supabaseStorageUrl;

const INITIAL_WINES: Wine[] = [
  { id: 'alesia', name: 'Red Wine Alesia', subtitle: 'Profundidade e elegância em sintonia', description: 'De cor rubi intensa e brilhante, Alesia revela aromas envolventes de frutas vermelhas maduras, notas sutis de especiarias e um delicado toque de carvalho. Encorpado e equilibrado.', price: 899.99, category: 'red', image: `${IMAGE_ROOT}/image-wine-red-alesia.png`, region: 'Itália' },
  { id: 'larnache', name: 'Larnache', subtitle: 'Intensidade de sabor', description: 'De coloração rubi profunda com reflexos violáceos, revela aromas de frutas vermelhas maduras. No paladar, é encorpado e aveludado.', price: 999.99, category: 'red', image: `${IMAGE_ROOT}/image-wine-red-larnache.png`, region: 'Portugal' },
  { id: 'vitalo', name: 'Vitalo Vermelho', subtitle: 'Um brinde ao vermelho que desperta sentidos', description: 'De tom rubi intenso com reflexos violáceos, exala aromas de frutas vermelhas maduras, como morango e amora. No paladar, revela corpo médio e textura aveludada.', price: 2300, category: 'red', image: `${IMAGE_ROOT}/image-wine-red-vitalo.png`, region: 'Chile' },
  { id: 'da-luz', name: 'Da Luz Branco', subtitle: 'Leveza e frescor em cada taça', description: 'Um vinho branco aromático e delicado, com notas cítricas e um final fresco. Uma boa escolha para acompanhar momentos leves.', price: 189.9, category: 'white', image: `${IMAGE_ROOT}/image-wine-da-luz.png`, region: 'Brasil' },
  { id: 'fresh-rose', name: 'Fresh Rosé', subtitle: 'Aroma delicado, final refrescante', description: 'Rosé de perfil leve, cor delicada e notas de frutas vermelhas frescas. Sirva gelado para aproveitar todo o seu frescor.', price: 149.9, category: 'rose', image: `${IMAGE_ROOT}/image-wine-fresh-rose.png`, region: 'Brasil' },
];

@Service()
export class WineService {
  private readonly database = inject(DatabaseService);

  readonly wines = signal<Wine[]>(INITIAL_WINES);
  readonly loading = signal(false);
  readonly error = signal('');
  private readonly removedIds = new Set<string>();

  loadWines(): void {
    if (!this.database.configured) return;
    this.loading.set(true);
    this.error.set('');
    this.database.getAll<Record<string, unknown>>('products')
      .pipe(
        map((rows) => this.mergeWithDemo(rows)),
        catchError(() => {
          this.error.set('Não foi possível carregar o catálogo do Supabase. Exibindo os vinhos de demonstração.');
          return of(this.wines());
        }),
        finalize(() => this.loading.set(false)),
      )
      .subscribe((wines) => this.wines.set(wines));
  }

  createWine(wine: Omit<Wine, 'id'>): Observable<Wine> {
    if (!this.database.configured) return of({ ...wine, id: `demo-${Date.now()}` });
    const row = { name: wine.name, subtitle: wine.subtitle, description: wine.description, price: wine.price, category: wine.category, image: wine.image, region: wine.region };
    return this.database.insert<Record<string, unknown>>('products', row)
      .pipe(map((rows) => this.toWine(rows[0] ?? row, Date.now())));
  }

  deleteWine(id: number | string): Observable<void> {
    if (!this.database.configured) return of(void 0);
    return this.database.delete('products', 'id', id);
  }

  addToCatalog(wine: Wine): void {
    this.removedIds.delete(String(wine.id));
    this.wines.update((items) => [wine, ...items]);
  }

  removeFromCatalog(id: number | string): void {
    this.removedIds.add(String(id));
    this.wines.update((items) => items.filter((wine) => String(wine.id) !== String(id)));
  }

  private mergeWithDemo(rows: Record<string, unknown>[]): Wine[] {
    const remote = rows.map((row, index) => this.toWine(row, index));
    const merged = INITIAL_WINES.map((demoWine) => {
      const match = remote.find((wine) => this.sameWine(wine, demoWine));
      return match ? { ...demoWine, ...match } : demoWine;
    });
    const extras = remote.filter((wine) => !INITIAL_WINES.some((demoWine) => this.sameWine(wine, demoWine)));
    return [...merged, ...extras].filter((wine) => !this.removedIds.has(String(wine.id)));
  }

  private sameWine(a: Wine, b: Wine): boolean {
    return String(a.id) === String(b.id) || this.normalize(a.name) === this.normalize(b.name);
  }

  private normalize(value: string): string {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase();
  }

  private toWine(row: Record<string, unknown>, index: number): Wine {
    const text = (value: unknown): string => String(value ?? '').trim();
    const name = text(row['name'] ?? row['title'] ?? row['product_name']);
    const fallback = INITIAL_WINES.find((wine) => this.normalize(wine.name) === this.normalize(name)) ?? INITIAL_WINES[index % INITIAL_WINES.length];
    const finalName = name || fallback.name;
    const id = (row['id'] as number | string | undefined) ?? finalName.toLowerCase().replace(/[^a-z0-9]+/g, '-') + index;
    const imageValue = text(row['image'] ?? row['image_url'] ?? row['photo']);
    const image = this.resolveImage(imageValue, fallback.image);
    const categoryValue = text(row['category'] ?? row['type'] ?? row['category_name'] ?? fallback.category).toLowerCase();
    const category: WineCategory = categoryValue.includes('white') || categoryValue.includes('branco') ? 'white' : categoryValue.includes('rose') || categoryValue.includes('rosé') ? 'rose' : 'red';
    const rawPrice = text(row['price'] ?? row['value'] ?? row['valor'] ?? row['preco']).replace(/[^\d.,-]/g, '');
    const normalizedPrice = rawPrice.includes(',') ? rawPrice.replace(/\./g, '').replace(',', '.') : rawPrice;
    const priceValue = Number(normalizedPrice || fallback.price);
    return {
      id,
      name: finalName,
      subtitle: text(row['subtitle'] ?? row['short_description']) || fallback.subtitle,
      description: text(row['description'] ?? row['details']) || fallback.description,
      price: Number.isFinite(priceValue) && priceValue > 0 ? priceValue : fallback.price,
      category,
      image,
      region: text(row['region'] ?? row['country']) || fallback.region,
    };
  }

  private storageImageUrl(path: string): string {
    return `${IMAGE_ROOT.replace(/\/$/, '')}/${path}`;
  }

  private resolveImage(value: string, fallback: string): string {
    if (!value) return fallback;

    if (/^https?:\/\//i.test(value) && !value.includes('/storage/v1/object/public/')) {
      return value;
    }

    const cleanPath = value.split(/[?#]/, 1)[0];
    const fileName = cleanPath.split('/').filter(Boolean).pop();
    return fileName ? this.storageImageUrl(fileName) : fallback;
  }
}
