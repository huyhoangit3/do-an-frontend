import { HttpClient, HttpParams } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { firstValueFrom } from "rxjs"

const CUSTOMER_API_URL = `http://localhost:8080/api/customers`
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getCustomerByAccountId(accountId: number): Promise<any> {
    let params = new HttpParams()
    params = params.append('accountId', accountId)
    return firstValueFrom(this.http.get<any[]>(CUSTOMER_API_URL, { params }))
  }

  getCustomerByInvoiceId(invoiceId: any): Promise<any> {
    let params = new HttpParams()
    params = params.append('invoiceId', invoiceId)
    return firstValueFrom(this.http.get<any[]>(CUSTOMER_API_URL, { params }))
  }

}