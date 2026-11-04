import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { WineService } from '../../services/wine.service';
import { WineForm } from './wine-form';

describe('WineForm', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WineForm],
      providers: [
        provideRouter([]),
        {
          provide: WineService,
          useValue: {
            wines: signal([]),
            loadWines: vi.fn(),
            createWine: vi.fn(),
            addToCatalog: vi.fn(),
            deleteWine: vi.fn(),
            removeFromCatalog: vi.fn()
          }
        }
      ]
    }).compileComponents();
  });

  it('cria o componente', () => {
    const fixture = TestBed.createComponent(WineForm);
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });
});