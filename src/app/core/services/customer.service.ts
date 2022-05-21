import { HttpClient, HttpParams } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { firstValueFrom } from "rxjs"
import { API } from "src/app/apiURL"

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getAllCustomers(): Promise<any> {
    return firstValueFrom(this.http.get<any>(API.CUSTOMER))
  }

  getCustomerByAccountId(accountId: number): Promise<any> {
    let params = new HttpParams()
    params = params.append('accountId', accountId)
    return firstValueFrom(this.http.get<any>(API.CUSTOMER, { params }))
  }

  getCustomerByInvoiceId(invoiceId: any): Promise<any> {
    let params = new HttpParams()
    params = params.append('invoiceId', invoiceId)
    return firstValueFrom(this.http.get<any[]>(API.CUSTOMER, { params }))
  }

}