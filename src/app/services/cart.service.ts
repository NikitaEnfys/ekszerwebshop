import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private itemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$: Observable<CartItem[]> = this.itemsSubject.asObservable();

  private get items(): CartItem[] {
    return this.itemsSubject.getValue();
  }

  addToCart(product: Product): void {
    const items = [...this.items];
    const idx = items.findIndex(i => i.product.id === product.id);
    if (idx > -1) {
      items[idx].quantity++;
    } else {
      items.push({ product, quantity: 1 });
    }
    this.itemsSubject.next(items);
  }

  updateQuantity(productId: string, quantity: number): void {
    const items = this.items.map(i =>
      i.product.id === productId ? { ...i, quantity } : i
    );
    this.itemsSubject.next(items);
  }

  removeFromCart(productId: string): void {
    const items = this.items.filter(i => i.product.id !== productId);
    this.itemsSubject.next(items);
  }

  clearCart(): void {
    this.itemsSubject.next([]);
  }

  getTotalPrice(): number {
    return this.items.reduce((sum, i) =>
      sum + i.product.price * i.quantity, 0
    );
  }

  // Régi sablonokhoz alias
  getItems(): CartItem[] {
    return this.items;
  }
  getTotal(): number {
    return this.getTotalPrice();
  }
}
