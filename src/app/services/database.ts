import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from './service';
import { environment } from '../../environments/environment';

@Service()
export class DatabaseService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.supabaseUrl.replace(/\/$/, '');
  private readonly key = environment.supabasePublishableKey;

  get configured(): boolean {
    return Boolean(this.baseUrl && this.key);
  }

  private get headers(): HttpHeaders {
    return new HttpHeaders({
      apikey: this.key,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    });
  }

  getAll<T>(table: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}/rest/v1/${table}?select=*`, {
      headers: this.headers,
    });
  }

  insert<T>(table: string, values: object): Observable<T[]> {
    return this.http.post<T[]>(`${this.baseUrl}/rest/v1/${table}`, values, {
      headers: this.headers,
    });
  }

  delete(table: string, column: string, value: number | string): Observable<void> {
    const filter = `${column}=eq.${encodeURIComponent(String(value))}`;
    return this.http.delete<void>(`${this.baseUrl}/rest/v1/${table}?${filter}`, {
      headers: this.headers,
    });
  }
}
