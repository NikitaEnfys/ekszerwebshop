import { Component, OnInit }         from '@angular/core';
import { CommonModule }              from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule }        from '@angular/material/form-field';
import { MatInputModule }            from '@angular/material/input';
import { MatCardModule }             from '@angular/material/card';
import { MatButtonModule }           from '@angular/material/button';
import { RouterLink }                from '@angular/router';
import { debounceTime }              from 'rxjs/operators';
import { ProductService }            from '../../services/product.service';
import { CartService }               from '../../services/cart.service';
import { Product }                   from '../../models/product';
import { PriceFormatPipe }           from '../../pipes/price-format.pipe';

@Component({
  selector: 'app-store-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    PriceFormatPipe,
    RouterLink
  ],
  templateUrl: './store-page.component.html',
  styleUrls: ['./store-page.component.css']
})
export class StorePageComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  selectedCategory = '';
  searchControl = new FormControl('');

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(prods => {
      this.products = prods;
      this.filteredProducts = prods;
      this.categories = [...new Set(prods.map(p => p.category))];
    });

    this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe(() => this.applyFilters());
  }

  applyFilters() {
    const term = this.searchControl.value?.toLowerCase() || '';
    this.filteredProducts = this.products
      .filter(p => p.name.toLowerCase().includes(term))
      .filter(p => !this.selectedCategory || p.category === this.selectedCategory);
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.applyFilters();
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
