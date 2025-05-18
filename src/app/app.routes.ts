import { Routes } from '@angular/router';
import { JewelryStoreComponent } from './components/jewelry-store/jewelry-store.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import {StorePageComponent} from './components/store-page/store-page.component';
import {AccountComponent} from './components/account/account.component';


import { AdminComponent } from './components/admin/admin.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';


import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { JewelryDetailComponent } from './components/jewelry-detail/jewelry-detail.component';


export const routes: Routes = [
  { path: '', component: JewelryStoreComponent },
  { path: 'store', component: StorePageComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },

  { path: 'product/:id', component: JewelryDetailComponent },
  // app-routing.module.ts
  {
    path: 'account',
    loadComponent: () => import('./components/account/account.component').then(m => m.AccountComponent)
  },




  {
    path: 'admin',
    loadComponent: () =>
      import('./components/admin/admin.component').then(m => m.AdminComponent),
    canActivate: [AdminGuard]
  },
  {
    path: 'account',
    loadComponent: () =>
      import('./components/user-orders/user-orders.component').then(m => m.UserOrdersComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/register/register.component').then(m => m.RegisterComponent)
  },

  { path: 'cart', component: CartComponent },


  { path: '**', redirectTo: '' }
];

