import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';
import { ContainerWines } from './container-wines';

describe('ContainerWines', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerWines],
      providers: [provideHttpClient(), provideRouter([])],
    }).compileComponents();
  });

  it('cria o componente', () => {
    const fixture = TestBed.createComponent(ContainerWines);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
