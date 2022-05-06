import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { environment } from 'src/environments/environment';

const PRODUCT_API_URL = environment.baseApiUrl + '/products'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[] = []

  constructor(private http: HttpClient) { }

  getAllProducts(): Promise<Product[]> {
    return firstValueFrom(this.http.get<Product[]>(PRODUCT_API_URL))
  }
  getTopProducts(): Promise<Product[]> {
    return firstValueFrom(this.http.get<Product[]>(`${PRODUCT_API_URL}/top-products`))
  }
  getProductById(productId: number): Promise<Product> {
    return firstValueFrom(this.http.get<Product>(`${PRODUCT_API_URL}/${productId}`))
  }
  findProductsByName(keyword: string): Observable<Product[]> {
    let queryParams = new HttpParams()
    queryParams = queryParams.append('keyword', keyword)
    return this.http.get<Product[]>(`${PRODUCT_API_URL}/search`, { params: queryParams })
  }
  findProductsByCategoryId(categoryId: number): Promise<Product[]> {
    let queryParams = new HttpParams()
    queryParams = queryParams.append('categoryId', categoryId)
    return firstValueFrom(this.http.get<Product[]>(`${PRODUCT_API_URL}`, { params: queryParams }))
  }
  addProduct(product: Product): Promise<Product> {
    return firstValueFrom(this.http.post<Product>(PRODUCT_API_URL, product))
  }
  updateProduct(productId: number, product: Product): Promise<Product> {
    return firstValueFrom(this.http.put<Product>(`${PRODUCT_API_URL}/${productId}`, product))
  }
  deleteProduct(productId: number): Promise<void> {
    return firstValueFrom(this.http.delete<void>(`${PRODUCT_API_URL}/${productId}`))
  }
}
