import { HttpClient, HttpParams } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { firstValueFrom } from "rxjs"

const INVOICE_API_URL = `http://localhost:8080/api/invoices`
@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  invoices: any[] = []

  constructor(private http: HttpClient) { }

  getInvoices(accountId: any): Promise<any> {
    let params = new HttpParams()
    params = params.append('accountId', accountId)
    return firstValueFrom(this.http.get<any[]>(INVOICE_API_URL, {params}))
  }

  getProductsInInvoice(id: number): Promise<any> {
    return firstValueFrom(this.http.get<any[]>(`${INVOICE_API_URL}/${id}/products`))
  }

  getAllInvoices(): Promise<any> {
    return firstValueFrom(this.http.get<any[]>(`${INVOICE_API_URL}`))
  }
}