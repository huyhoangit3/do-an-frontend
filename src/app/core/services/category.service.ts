import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { API } from 'src/app/apiURL';
import { Category } from 'src/app/models/category.model';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories: Category[] = []

  constructor(private http: HttpClient) { }

  getAllCategories(): Promise<Category[]> {
    return firstValueFrom(this.http.get<Category[]>(API.CATEGORY))
  }

  findCategoryByName(keyword: string): Observable<Category[]> {
    let queryParams = new HttpParams()
    queryParams = queryParams.append('keyword', keyword)
    return this.http.get<Category[]>(API.CATEGORY + '/search', { params: queryParams })
  }

  addCategory(category: Category): Promise<Category> {
    return firstValueFrom(this.http.post<Category>(API.CATEGORY, category))
  }
  
  getCategoryById(categoryId: number): Promise<Category> {
    return firstValueFrom(this.http.get<Category>(`${API.CATEGORY}/${categoryId}`))
  }

  updateCategory(categoryId: number, category: Category): Promise<Category> {
    return firstValueFrom(this.http.put<Category>(`${API.CATEGORY}/${categoryId}`, category))
  }

  deleteCategory(categoryId: number): Promise<void> {
    return firstValueFrom(this.http.delete<void>(`${API.CATEGORY}/${categoryId}`))
  }
}
