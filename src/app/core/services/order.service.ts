import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { firstValueFrom } from "rxjs"
import { API } from "src/app/apiURL"
import { environment } from "src/environments/environment"

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  order(data: any): Promise<any> {
    return firstValueFrom(this.http.post<any[]>(API.ORDER, data))
  }
  cancelOrder(orderId: number) {
    return firstValueFrom(this.http.get<any>(`${API.ORDER}/cancelOrder/${orderId}`))
  }
}