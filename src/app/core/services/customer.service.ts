import { HttpClient, HttpParams } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { firstValueFrom } from "rxjs"
import { Category } from "src/app/models/category.model"

const CUSTOMER_API_URL = `http://localhost:8080/api/customers`
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getCustomer(accountId: number): Promise<any> {
    let params = new HttpParams()
    params = params.append('accountId', accountId)
    return firstValueFrom(this.http.get<any[]>(CUSTOMER_API_URL, {params}))
  }
}