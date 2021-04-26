import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private updateProductListEmitter = new EventEmitter();
  private productsUrl: string = 'http://localhost:3333/products/'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    })
  }

  constructor(private httpClient: HttpClient) { }

  getUpdateProductListEmitter() {
    return this.updateProductListEmitter;
  }

  emitUpdateProductList() {
    this.updateProductListEmitter.emit();
  }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.productsUrl}`, this.httpOptions);
  }

  getProductById(id: string): Observable<Product> {
    return this.httpClient.get<Product>(`${this.productsUrl}${id}`);
  }

  saveProduct(name: string, manufacturing: string, size: string, price: string) {
    return this.httpClient.post(
      this.productsUrl,
      { name, manufacturing, size, price },
    );
  }

  updateProductById(id: string, name: string, manufacturing: string, size: string, price: string) {
    return this.httpClient.put(`${this.productsUrl}${id}`,
      { name, manufacturing, size, price },
    )
  }

  deleteProductById(id: string) {
    return this.httpClient.delete(`${this.productsUrl}${id}`);
  }
}
