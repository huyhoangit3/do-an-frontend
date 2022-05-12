import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { firstValueFrom } from "rxjs"
import { Category } from "src/app/models/category.model"

const ORDER_API_URL = `http://localhost:8080/api/orders`
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  order(data: any): Promise<any> {
    return firstValueFrom(this.http.post<any[]>(ORDER_API_URL, data))
  }
}