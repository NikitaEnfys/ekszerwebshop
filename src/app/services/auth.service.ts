import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';

@Injectable({ providedIn: 'root' })
export class AuthService {
  currentUser$: Observable<firebase.User | null>;

  constructor(private afAuth: AngularFireAuth) {
    this.currentUser$ = afAuth.authState;
  }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.afAuth.signOut();
  }

  register(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

}

