import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';
  error: string | null = null;

  private auth = inject(Auth);
  private router = inject(Router);

  login() {
    signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then(() => this.router.navigate(['/']))
      .catch(err => this.error = err.message);
  }
}
