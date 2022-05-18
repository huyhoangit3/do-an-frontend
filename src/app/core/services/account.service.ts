import { HttpClient, HttpParams } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { FormGroup } from "@angular/forms"
import { firstValueFrom } from "rxjs"
import { API } from "src/app/apiURL"

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  accounts: any[] = []

  constructor(private http: HttpClient) { }

  getAllAccounts() {
    return firstValueFrom(this.http.get<any>(`${API.ACCOUNT}`))
  }
  addAccount(accountForm: FormGroup) {
    return firstValueFrom(this.http.post<any>(`${API.ACCOUNT}`, accountForm.value))
  }
  updateAccount(accountId: number, profileForm: any): Promise<any> {
    return firstValueFrom(this.http.put<any>(`${API.ACCOUNT}/${accountId}/update`, profileForm.value))
  }
  updateAccountStatus(accountId: number, status: boolean): Promise<any> {
    let params = new HttpParams()
    params = params.append('status', status === true ? 1 : 0)
    return firstValueFrom(this.http.put<any>(`${API.ACCOUNT}/${accountId}`, null, {params}))
  }
}