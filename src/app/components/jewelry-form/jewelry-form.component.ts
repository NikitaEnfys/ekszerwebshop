import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-jewelry-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './jewelry-form.component.html',
  styleUrls: ['./jewelry-form.component.css']
})
export class JewelryFormComponent implements OnInit {
  jewelryForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.jewelryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      imageUrl: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.jewelryForm.valid) {
      console.log("Új ékszer:", this.jewelryForm.value);
      this.jewelryForm.reset();
    }
  }
}
