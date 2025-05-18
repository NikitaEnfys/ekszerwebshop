import { Component, OnInit }     from '@angular/core';
import { CommonModule }          from '@angular/common';
import { FormsModule }           from '@angular/forms';
import { MatTableModule }        from '@angular/material/table';
import { MatButtonModule }       from '@angular/material/button';
import { MatIconModule }         from '@angular/material/icon';
import { MatInputModule }        from '@angular/material/input';
import { MatSelectModule }       from '@angular/material/select';
import { Product }               from '../../models/product';
import { ProductService }        from '../../services/product.service';
import { ImageUploadService }    from '../../services/image-upload.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  products: Product[] = [];

  // új termék
  newProduct: Partial<Product> = { stock: 0 };
  previewUrl?: string;
  uploadInProgress = false;

  // szerkesztés
  editModeId: string | null = null;
  editModel: Partial<Product> = {};
  editPreviewUrl?: string;
  editUploadInProgress = false;

  displayedColumns = [
    'id',
    'image',
    'name',
    'description',
    'price',
    'category',
    'stock',
    'actions'
  ];
  categories = ['Nyaklánc','Karkötő','Gyűrű','Fülbevaló','Kiegészítő'];

  constructor(
    private productService: ProductService,
    private imageUpload: ImageUploadService
  ) {}

  ngOnInit() {
    this.productService.getProducts()
      .subscribe(list => this.products = list);
  }

  // új kép kiválasztása
  async onFileSelected(evt: Event) {
    const file = (evt.target as HTMLInputElement).files?.[0];
    if (!file) return;

    // Preview
    const reader = new FileReader();
    reader.onload = () => this.previewUrl = reader.result as string;
    reader.readAsDataURL(file);

    // Feltöltés
    this.uploadInProgress = true;
    try {
      const path = `products/${Date.now()}_${file.name}`;
      this.newProduct.imageUrl = await this.imageUpload.uploadFileAndGetUrl(file, path);
    } catch {
      alert('Kép feltöltése sikertelen');
    } finally {
      this.uploadInProgress = false;
    }
  }

  // szerkesztés közbeni képváltás
  async onEditFileSelected(evt: Event) {
    const file = (evt.target as HTMLInputElement).files?.[0];
    if (!file || !this.editModeId) return;

    const reader = new FileReader();
    reader.onload = () => this.editPreviewUrl = reader.result as string;
    reader.readAsDataURL(file);

    this.editUploadInProgress = true;
    try {
      const path = `products/${this.editModeId}_${file.name}`;
      this.editModel.imageUrl = await this.imageUpload.uploadFileAndGetUrl(file, path);
    } catch {
      alert('Kép feltöltése sikertelen');
    } finally {
      this.editUploadInProgress = false;
    }
  }

  startEdit(p: Product) {
    this.editModeId     = p.id ?? null;
    this.editModel      = { ...p };
    this.editPreviewUrl = p.imageUrl;
  }

  cancelEdit() {
    this.editModeId     = null;
    this.editPreviewUrl = undefined;
  }

  saveEdit() {
    if (!this.editModeId) return;
    this.productService.updateProduct(this.editModeId, this.editModel)
      .then(() => this.cancelEdit());
  }

  addProduct() {
    if (!this.newProduct.imageUrl) {
      alert('Tölts fel képet előbb!');
      return;
    }
    this.productService.addProduct(this.newProduct as Product)
      .then(() => {
        this.newProduct  = { stock: 0 };
        this.previewUrl  = undefined;
      });
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id);
  }
}
