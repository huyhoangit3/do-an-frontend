import { HttpClient, HttpParams } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { firstValueFrom } from "rxjs"
import { Category } from "src/app/models/category.model"

const ACCOUNT_API_URL = `http://localhost:8080/api/accounts`
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  updateAccount(accountId: number, profileForm: any): Promise<any> {
    return firstValueFrom(this.http.put<any[]>(`${ACCOUNT_API_URL}/${accountId}/update`, profileForm.value))
  }
}