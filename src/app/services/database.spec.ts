import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { environment } from '../../environments/environment';
import { DatabaseService } from './database';

describe('DatabaseService', () => {
  let service: DatabaseService;
  let http: HttpTestingController;
  const baseUrl = `${environment.supabaseUrl}/rest/v1`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(DatabaseService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('busca os registros da tabela', () => {
    service.getAll<{ id: number }>('products').subscribe((rows) => {
      expect(rows).toEqual([{ id: 1 }]);
    });

    const request = http.expectOne(`${baseUrl}/products?select=*`);

    expect(request.request.method).toBe('GET');
    expect(request.request.headers.get('apikey')).toBe(
      environment.supabasePublishableKey
    );

    request.flush([{ id: 1 }]);
  });

  it('cadastra um registro na tabela', () => {
    const product = { name: 'Vinho de teste', price: 50 };

    service.insert('products', product).subscribe((rows) => {
      expect(rows).toEqual([{ id: 1, ...product }]);
    });

    const request = http.expectOne(`${baseUrl}/products`);

    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(product);

    request.flush([{ id: 1, ...product }]);
  });

  it('remove um registro pelo identificador', () => {
    service.delete('products', 'id', 1).subscribe();

    const request = http.expectOne(`${baseUrl}/products?id=eq.1`);

    expect(request.request.method).toBe('DELETE');
    request.flush(null);
  });
});