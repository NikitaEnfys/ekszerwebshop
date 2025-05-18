import { Component, OnInit }  from '@angular/core';
import { CommonModule }       from '@angular/common';
import { MatCardModule }      from '@angular/material/card';
import { MatButtonModule }    from '@angular/material/button';
import { RouterLink }         from '@angular/router';
import { PriceFormatPipe }    from '../../pipes/price-format.pipe';
import { Product }            from '../../models/product';
import { ProductService }     from '../../services/product.service';
import { CartService }        from '../../services/cart.service';

@Component({
  selector: 'app-jewelry-store',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterLink,
    PriceFormatPipe
  ],
  templateUrl: './jewelry-store.component.html',
  styleUrls: ['./jewelry-store.component.css']
})
export class JewelryStoreComponent implements OnInit {
  allProducts: Product[] = [];
  bracelets:   Product[] = [];
  under5000:   Product[] = [];
  newArrivals: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService:    CartService
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(list => {
      this.allProducts = list;
      this.bracelets   = list.filter(p => p.category.toLowerCase() === 'bracelet');
      this.under5000   = list.filter(p => p.price <= 5000);
      // Újdonságok: az első 5 termék a listából
      this.newArrivals = list.slice(0, 5);
    });
  }

  addToCart(p: Product) {
    this.cartService.addToCart(p);
  }
}
