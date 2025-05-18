import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }     from '@angular/material/input';
import { MatButtonModule }    from '@angular/material/button';
import { MatStepperModule }   from '@angular/material/stepper';
import { CartService }        from '../../services/cart.service';
import { PriceFormatPipe }    from '../../pipes/price-format.pipe';

import { Auth } from '@angular/fire/auth';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatStepperModule,
    PriceFormatPipe
  ],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  personalForm!: FormGroup;
  shippingForm!: FormGroup;
  paymentForm!: FormGroup;

  // Firebase szolgáltatások injektálása
  auth = inject(Auth);
  firestore = inject(Firestore);

  constructor(
    private fb: FormBuilder,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.personalForm = this.fb.group({
      fullName: ['', Validators.required],
      email:    ['', [Validators.required, Validators.email]]
    });

    this.shippingForm = this.fb.group({
      address:    ['', Validators.required],
      city:       ['', Validators.required],
      postalCode: ['', Validators.required]
    });

    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern('\\d{16}')]],
      expiryDate: ['', Validators.required],
      cvv:        ['', [Validators.required, Validators.pattern('\\d{3}')]]
    });
  }

  get total(): number {
    return this.cartService.getTotalPrice();
  }

  async submitOrder(): Promise<void> {
    const user = this.auth.currentUser;
    if (!user) {
      alert('Jelentkezz be a rendelés leadásához!');
      return;
    }

    const order = {
      userId: user.uid,
      date: new Date().toISOString(),
      total: this.total,
      items: this.cartService.getItems(),
      personal: this.personalForm.value,
      shipping: this.shippingForm.value,
      status: 'függőben'
    };

    try {
      const ordersRef = collection(this.firestore, 'orders');
      await addDoc(ordersRef, order);

      alert('Rendelés sikeresen leadva!');
      this.cartService.clearCart();
    } catch (error) {
      console.error('Hiba a rendelés mentése közben:', error);
      alert('Nem sikerült a rendelés leadása.');
    }
  }
}
