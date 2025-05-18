import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  email = '';
  password = '';
  error: string | null = null;

  private auth = inject(Auth);
  private router = inject(Router);

  register() {
    createUserWithEmailAndPassword(this.auth, this.email, this.password)
      .then(() => this.router.navigate(['/']))
      .catch(err => this.error = err.message);
  }
}
