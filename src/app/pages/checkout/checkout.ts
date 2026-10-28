import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
@Component({ selector:'app-checkout', imports:[ReactiveFormsModule], templateUrl:'./checkout.html', styleUrl:'./checkout.scss' })
export class Checkout {
  readonly cart = inject(CartService);
  private readonly fb = inject(FormBuilder);
  readonly form = this.fb.nonNullable.group({
    name:['',Validators.required],
    email:['',[Validators.required,Validators.email]],
    address:['',Validators.required]
  });
  submitted = false;
  submit(): void { if (this.form.valid) this.submitted = true; else this.form.markAllAsTouched(); }
}
