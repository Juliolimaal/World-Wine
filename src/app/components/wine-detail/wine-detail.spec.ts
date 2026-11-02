import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';
import { WineDetail } from './wine-detail';

describe('WineDetail', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WineDetail],
      providers: [provideHttpClient(), provideRouter([])],
    }).compileComponents();
  });

  it('cria o componente', () => {
    const fixture = TestBed.createComponent(WineDetail);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
