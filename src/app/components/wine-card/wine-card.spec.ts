import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';
import { WineCard } from './wine-card';

describe('WineCard', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WineCard],
      providers: [provideHttpClient(), provideRouter([])],
    }).compileComponents();
  });

  it('cria o componente', () => {
    const fixture = TestBed.createComponent(WineCard);
    fixture.componentRef.setInput('wine', { id: 'teste', name: 'Vinho de teste', subtitle: 'Rótulo', description: 'Descrição do vinho de teste', price: 50, category: 'red', image: '', region: 'Brasil' });
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
