import { Component, OnInit }    from '@angular/core';
import { CommonModule }         from '@angular/common';
import { ActivatedRoute }       from '@angular/router';
import { MatCardModule }        from '@angular/material/card';
import { MatButtonModule }      from '@angular/material/button';
import { RouterLink }           from '@angular/router';
import { PriceFormatPipe }      from '../../pipes/price-format.pipe';
import { ProductService }       from '../../services/product.service';
import { CartService }          from '../../services/cart.service';
import { Product }              from '../../models/product';
import { Observable }           from 'rxjs';

@Component({
  selector: 'app-jewelry-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    PriceFormatPipe,
    RouterLink
  ],
  templateUrl: './jewelry-detail.component.html',
  styleUrls: ['./jewelry-detail.component.css']
})
export class JewelryDetailComponent implements OnInit {
  jewelry$!: Observable<Product>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService      // ← inject CartService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.jewelry$ = this.productService.getProductById(id);
    }
  }

  addToCart(item: Product) {
    this.cartService.addToCart(item);
    // optionally give user feedback, e.g. a toast or console
    console.log(`${item.name} hozzáadva a kosárhoz.`);
  }

  goBack() {
    window.history.back();
  }
}
