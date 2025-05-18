// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  docData,
  CollectionReference,
  DocumentReference
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product }    from '../models/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private col: CollectionReference<Product>;

  constructor(private firestore: Firestore) {
    this.col = collection(this.firestore, 'products') as CollectionReference<Product>;
  }

  getProducts(): Observable<Product[]> {
    return collectionData(this.col, { idField: 'id' }) as Observable<Product[]>;
  }

  getProductById(id: string): Observable<Product> {
    const ref = doc(this.firestore, `products/${id}`) as DocumentReference<Product>;
    return docData(ref, { idField: 'id' }) as Observable<Product>;
  }

  addProduct(product: Product): Promise<void> {
    // szűrjük az undefined mezőket is
    const data = this.clean(product);
    return addDoc(this.col, data).then(() => {});
  }

  updateProduct(id: string, product: Partial<Product>): Promise<void> {
    const ref = doc(this.firestore, `products/${id}`);
    const data = this.clean(product);
    return updateDoc(ref, data);
  }

  deleteProduct(id: string): Promise<void> {
    const ref = doc(this.firestore, `products/${id}`);
    return deleteDoc(ref);
  }

  /** kiszűri az undefined és id mezőt */
  private clean(obj: Partial<Product>): { [key: string]: any } {
    return Object.entries(obj)
      .filter(([key, val]) => val !== undefined && key !== 'id')
      .reduce((a, [key, val]) => ({ ...a, [key]: val }), {});
  }
}
