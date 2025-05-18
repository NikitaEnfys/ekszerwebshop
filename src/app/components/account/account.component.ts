import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import {
  Firestore,
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc
} from '@angular/fire/firestore';

@Component({
  standalone: true,
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  imports: [CommonModule, FormsModule, CurrencyPipe, DatePipe]
})
export class AccountComponent implements OnInit {
  auth = inject(Auth);
  firestore = inject(Firestore);

  userId!: string;
  userEmail!: string;
  shippingData: any = {};
  billingData: any = {};
  orders: any[] = [];
  selectedOrderId: string | null = null;

  isAdminEmail = 'somorjailili@gmail.com';

  ngOnInit(): void {
    onAuthStateChanged(this.auth, async (user: User | null) => {
      if (user) {
        this.userId = user.uid;
        this.userEmail = user.email ?? '';
        await this.loadUserData();
        await this.loadOrders();
      }
    });
  }

  isAdmin(): boolean {
    return this.userEmail === this.isAdminEmail;
  }

  toggleDetails(orderId: string) {
    this.selectedOrderId = this.selectedOrderId === orderId ? null : orderId;
  }

  async loadUserData() {
    const shippingSnap = await getDoc(doc(this.firestore, `users/${this.userId}/shippingData/info`));
    this.shippingData = shippingSnap.exists() ? shippingSnap.data() : {};

    const billingSnap = await getDoc(doc(this.firestore, `users/${this.userId}/billingData/info`));
    this.billingData = billingSnap.exists() ? billingSnap.data() : {};
  }

  async loadOrders() {
    const ordersRef = collection(this.firestore, 'orders');
    const q = this.isAdmin()
      ? query(ordersRef)
      : query(ordersRef, where('userId', '==', this.userId));

    const querySnap = await getDocs(q);
    this.orders = querySnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async updateShipping(data: any) {
    await setDoc(doc(this.firestore, `users/${this.userId}/shippingData/info`), data);
  }

  async updateBilling(data: any) {
    await setDoc(doc(this.firestore, `users/${this.userId}/billingData/info`), data);
  }

  async updateOrderStatus(order: any) {
    try {
      const ref = doc(this.firestore, 'orders', order.id);
      await updateDoc(ref, { status: order.status });
    } catch (e) {
      console.error('Státusz mentése sikertelen:', e);
    }
  }
}
