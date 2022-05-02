import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { environment } from 'src/environments/environment';

const PRODUCT_API_URL = environment.baseApiUrl + '/products'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(PRODUCT_API_URL)
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(PRODUCT_API_URL, product)
  }
}
