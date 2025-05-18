import { Component, OnInit } from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { MatCardModule }      from '@angular/material/card';
import { MatButtonModule }    from '@angular/material/button';
import { MatIconModule }      from '@angular/material/icon';
import { RouterLink }         from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';
import { PriceFormatPipe }    from '../../pipes/price-format.pipe';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    PriceFormatPipe,
    RouterLink
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => this.cartItems = items);
  }

  updateQuantity(productId: string, quantity: number) {
    this.cartService.updateQuantity(productId, quantity);
  }

  remove(productId: string) {
    this.cartService.removeFromCart(productId);
  }

  get total(): number {
    return this.cartService.getTotalPrice();
  }
}
