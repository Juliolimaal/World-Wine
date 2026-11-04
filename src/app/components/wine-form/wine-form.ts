import { DecimalPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { WineCategory } from '../../models/wine';
import { WineService } from '../../services/wine.service';

@Component({
  selector: 'app-wine-form',
  imports: [ReactiveFormsModule, RouterLink, DecimalPipe],
  templateUrl: './wine-form.html'
})
export class WineForm {
  private readonly formBuilder = inject(FormBuilder);
  readonly catalog = inject(WineService);
  readonly message = signal('');
  readonly saving = signal(false);

  readonly form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    subtitle: ['', Validators.required],
    description: ['', [Validators.required, Validators.minLength(12)]],
    price: [0, [Validators.required, Validators.min(0.01)]],
    category: ['red' as WineCategory, Validators.required],
    image: ['', Validators.required],
    region: ['', Validators.required]
  });

  constructor() {
    this.catalog.loadWines();
  }

  submit(): void {
    this.message.set('');

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.catalog.createWine(this.form.getRawValue()).subscribe({
      next: (wine) => {
        this.catalog.addToCatalog(wine);
        this.message.set('Vinho cadastrado.');
        this.form.reset({
          name: '',
          subtitle: '',
          description: '',
          price: 0,
          category: 'red',
          image: '',
          region: ''
        });
        this.saving.set(false);
      },
      error: () => {
        this.message.set('Não foi possível cadastrar o vinho. Verifique a conexão e as permissões do Supabase.');
        this.saving.set(false);
      }
    });
  }

  remove(id: number | string): void {
    this.message.set('');

    this.catalog.deleteWine(id).subscribe({
      next: () => {
        this.catalog.removeFromCatalog(id);
        this.message.set('Vinho removido do catálogo.');
      },
      error: () => {
        this.message.set('Não foi possível remover o vinho. Verifique as permissões do Supabase.');
      }
    });
  }
}