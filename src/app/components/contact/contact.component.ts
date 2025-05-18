import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <section class="contact-container container">
      <h1>Kapcsolat</h1>

      <div class="contact-info">
        <p><strong>Telefon:</strong> +36 30 123 4567</p>
        <p><strong>Cím:</strong> Szeged, Magyarország</p>
      </div>

      <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Név</mat-label>
          <input matInput formControlName="name" placeholder="Add meg a neved">
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Email</mat-label>
          <input matInput formControlName="email" placeholder="Email címed">
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Üzenet</mat-label>
          <textarea matInput formControlName="message" rows="5" placeholder="Írd meg az üzeneted"></textarea>
        </mat-form-field>

        <button mat-raised-button color="primary" type="submit" [disabled]="contactForm.invalid || isSending">
          {{ isSending ? 'Küldés...' : 'Küldés' }}
        </button>
      </form>

      <div class="success-message" *ngIf="messageSent">
        <p>✅ Köszönjük az üzenetet! Hamarosan jelentkezünk.</p>
      </div>

      <div class="social-links">
        <a href="https://www.facebook.com/profile.php?id=100087134170636" target="_blank">Facebook</a> |
        <a href="https://instagram.com/design_ricochet" target="_blank">Instagram</a>
      </div>
    </section>
  `,
  styles: [`
    .contact-container {
      padding: 2rem;
      max-width: 600px;
      margin: 0 auto;
    }
    .contact-container h1 {
      text-align: center;
      margin-bottom: 1.5rem;
      font-size: 2.5rem;
      color: #3f51b5;
    }
    .contact-info {
      text-align: center;
      margin-bottom: 2rem;
      font-size: 1rem;
      color: #555;
    }
    .full-width {
      width: 100%;
      margin-bottom: 1rem;
    }
    button {
      display: block;
      margin: 0 auto;
    }
    .success-message {
      text-align: center;
      margin-top: 1.5rem;
      color: #388e3c;
      font-weight: 500;
    }
    .social-links {
      text-align: center;
      margin-top: 2rem;
      font-size: 1rem;
    }
    .social-links a {
      color: #3f51b5;
      text-decoration: none;
    }
    .social-links a:hover {
      text-decoration: underline;
    }
  `]
})
export class ContactComponent {
  contactForm: FormGroup;
  messageSent = false;
  isSending = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  async onSubmit(): Promise<void> {
    if (this.contactForm.valid) {
      this.isSending = true;

      const templateParams = {
        from_name: this.contactForm.value.name,
        from_email: this.contactForm.value.email,
        message: this.contactForm.value.message
      };

      try {
        await emailjs.send(
          'service_c4c41qh',
          'template_5hapoon',
          templateParams,
          'ZLUVyxGE5vNaqgkN7'
        );

        this.messageSent = true;
        this.contactForm.reset();
      } catch (error: any) {
        console.error('Hiba az email küldésekor:', error?.text || error);
      } finally {
        this.isSending = false;
        setTimeout(() => this.messageSent = false, 5000);
      }
    }
  }
}
