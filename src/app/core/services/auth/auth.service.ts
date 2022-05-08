import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from './token-storage.service';
import { FormGroup } from '@angular/forms';

const AUTH_API_URL = environment.baseApiUrl + '/auth'

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient,
    private tokenStorageService: TokenStorageService) { }


  signUp(signUpForm: FormGroup): Promise<any> {
    return firstValueFrom(this.http.post(`${AUTH_API_URL}/signup`, signUpForm.value))
  }

  generateToken(loginForm: FormGroup): Promise<any> {
    return firstValueFrom(this.http.post(`${environment.baseApiUrl}/auth/signin`, loginForm.value))
  }

  isLoggedIn(): boolean {
    let token = this.tokenStorageService.getToken()
    return token === null ? false : true
  }
  getCurrentUser(): Promise<any> {
    return firstValueFrom(this.http.get(`${environment.baseApiUrl}/auth/current-user`))
  }
}