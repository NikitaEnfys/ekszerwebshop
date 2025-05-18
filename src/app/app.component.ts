import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { Auth, onAuthStateChanged, signOut, User } from '@angular/fire/auth';
import { MatSidenav } from '@angular/material/sidenav';
import { ViewChild } from '@angular/core';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule
  ]
})
export class AppComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  cartCount = 0;
  auth = inject(Auth);
  user = signal<User | null>(null);
  isAdmin = computed(() => this.user()?.email === 'somorjailili@gmail.com');

  constructor(private cartService: CartService) {
    onAuthStateChanged(this.auth, user => this.user.set(user));
    this.cartService.cartItems$.subscribe(items => {
      this.cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
    });
  }

  logout() {
    signOut(this.auth);
  }
}
