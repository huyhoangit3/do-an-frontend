import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { API } from 'src/app/apiURL';
import { Product } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[] = []

  constructor(private http: HttpClient) { }

  getAllProducts(): Promise<Product[]> {
    return firstValueFrom(this.http.get<Product[]>(API.PRODUCT))
  }
  getTopProducts(): Promise<Product[]> {
    return firstValueFrom(this.http.get<Product[]>(`${API.PRODUCT}/top-products`))
  }
  getProductById(productId: number): Promise<Product> {
    return firstValueFrom(this.http.get<Product>(`${API.PRODUCT}/${productId}`))
  }
  getProductsInInvoice(invoiceId: number): Promise<any> {
    let queryParams = new HttpParams()
    queryParams = queryParams.append('invoiceId', invoiceId)
    return firstValueFrom(this.http.get<any>(`${API.PRODUCT}`, { params: queryParams }))
  }
  findProductsByName(keyword: string): Observable<Product[]> {
    let queryParams = new HttpParams()
    queryParams = queryParams.append('keyword', keyword)
    return this.http.get<Product[]>(`${API.PRODUCT}/search`, { params: queryParams })
  }
  findProductsByCategoryId(categoryId: number): Promise<Product[]> {
    let queryParams = new HttpParams()
    queryParams = queryParams.append('categoryId', categoryId)
    return firstValueFrom(this.http.get<Product[]>(`${API.PRODUCT}`, { params: queryParams }))
  }
  addProduct(product: Product): Promise<Product> {
    return firstValueFrom(this.http.post<Product>(API.PRODUCT, product))
  }
  updateProduct(productId: number, product: Product): Promise<Product> {
    return firstValueFrom(this.http.put<Product>(`${API.PRODUCT}/${productId}`, product))
  }
  deleteProduct(productId: number): Promise<void> {
    return firstValueFrom(this.http.delete<void>(`${API.PRODUCT}/${productId}`))
  }

  isHotProduct(productId: number): boolean {
    const temp = [...this.products]
    const sortedProduct = temp.sort((a, b) => {
      return b.sold - a.sold
    })
    const topProduct = sortedProduct.slice(0, 7)
    return topProduct.map(p => p.id).includes(productId)
  }
}
