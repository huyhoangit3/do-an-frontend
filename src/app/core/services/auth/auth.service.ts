import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { API } from 'src/app/apiURL';
import { TokenStorageService, TOKEN_KEY, USER_KEY } from './token-storage.service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient,
    private tokenStorageService: TokenStorageService) { }


  signUp(signUpForm: FormGroup): Promise<any> {
    return firstValueFrom(this.http.post<any>(`${API.AUTH}/signup`, signUpForm.value))
  }

  signIn(loginForm: FormGroup): Promise<any> {
    return firstValueFrom(this.http.post<any>(`${API.AUTH}/signin`, loginForm.value))
  }

  signOut(): void {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  }

  isLoggedIn(): boolean {
    const currentUser = this.tokenStorageService.getCurrentUser()
    return currentUser === null ? false : true
  }
  getCurrentUser(): Promise<any> {
    return firstValueFrom(this.http.get<any>(`${API.AUTH}/current-user`))
  }

  isAdmin(currentUser: any): boolean {
    const roles = currentUser.roles
    for(let role of roles) {
      if(role.name === 'ROLE_ADMIN')
        return true
    }
    return false
  }

  isModerator(currentUser: any): boolean {
    const roles = currentUser.roles
    for(let role of roles) {
      if(role.name === 'ROLE_MODERATOR')
        return true
    }
    return false
  }
  isUser(currentUser: any): boolean {
    const roles = currentUser.roles
    for(let role of roles) {
      if(role.name === 'ROLE_USER')
        return true
    }
    return false
  }
}