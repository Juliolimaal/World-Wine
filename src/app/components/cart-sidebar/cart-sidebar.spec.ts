import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';
import { CartSidebar } from './cart-sidebar';

describe('CartSidebar', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartSidebar],
      providers: [provideHttpClient(), provideRouter([])],
    }).compileComponents();
  });

  it('cria o componente', () => {
    const fixture = TestBed.createComponent(CartSidebar);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
