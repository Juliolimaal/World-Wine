import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';
import { CartButton } from './cart-button';

describe('CartButton', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartButton],
      providers: [provideHttpClient(), provideRouter([])],
    }).compileComponents();
  });

  it('cria o componente', () => {
    const fixture = TestBed.createComponent(CartButton);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
