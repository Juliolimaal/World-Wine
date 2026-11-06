import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';
import { WineForm } from './wine-form';

describe('WineForm', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WineForm],
      providers: [provideHttpClient(), provideRouter([])],
    }).compileComponents();
  });

  it('cria o componente', () => {
    const fixture = TestBed.createComponent(WineForm);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
