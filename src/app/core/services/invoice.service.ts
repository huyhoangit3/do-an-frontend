import { HttpClient, HttpParams } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { firstValueFrom } from "rxjs"
import { API } from "src/app/apiURL"

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  invoices: any[] = []

  constructor(private http: HttpClient) { }

  getAllInvoices(): Promise<any> {
    return firstValueFrom(this.http.get<any[]>(`${API.INVOICE}`))
  }
  getInvoicesByAccountId(accountId: any): Promise<any> {
    let params = new HttpParams()
    params = params.append('accountId', accountId)
    return firstValueFrom(this.http.get<any>(API.INVOICE, { params }))
  }

  getInvoiceById(invoiceId: any): Promise<any> {
    return firstValueFrom(this.http.get<any>(`${API.INVOICE}/${invoiceId}`))
  }

  updateStatus(invoiceId: number, status: number) {
    let params = new HttpParams()
    params = params.append('status', status)
    return firstValueFrom(this.http.get<any>(`${API.INVOICE}/${invoiceId}`, { params }))
  }
}