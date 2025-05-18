import { inject, Injectable } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { authState } from 'rxfire/auth';

export const AdminGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  return authState(auth).pipe(
    map(user => user?.email === 'somorjailili@gmail.com')
  );
};
