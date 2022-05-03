import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { environment } from 'src/environments/environment';

const CATEGORY_API_URL = environment.baseApiUrl + '/categories'

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAllCategories(): Promise<Category[]> {
    return firstValueFrom(this.http.get<Category[]>(CATEGORY_API_URL))
  }

  addCategory(category: Category): Promise<Category> {
    return firstValueFrom(this.http.post<Category>(CATEGORY_API_URL, category))
  }
  findCategoryByName(keyword: string): Observable<Category[]> {
    let queryParams = new HttpParams()
    queryParams = queryParams.append('keyword', keyword)
    return this.http.get<Category[]>(CATEGORY_API_URL + '/search', { params: queryParams })
  }
  getCategoryById(categoryId: number): Promise<Category> {
    return firstValueFrom(this.http.get<Category>(`${CATEGORY_API_URL}/${categoryId}`))
  }

  updateCategory(categoryId: number, category: Category): Promise<Category> {
    return firstValueFrom(this.http.put<Category>(`${CATEGORY_API_URL}/${categoryId}`, category))
  }

  deleteCategory(categoryId: number): Promise<void> {
    return firstValueFrom(this.http.delete<void>(`${CATEGORY_API_URL}/${categoryId}`))
  }
}
