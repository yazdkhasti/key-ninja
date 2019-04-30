import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = "token"

  redirectUrl: string;

  constructor(private router: Router) { }

  getToken(): string {
    return localStorage.getItem(this.tokenKey) || sessionStorage.getItem(this.tokenKey);
  }

  setToken(token: string, permanent: boolean) {
    permanent ? localStorage.setItem(this.tokenKey, token) : sessionStorage.setItem(this.tokenKey, token);
  }

  removeToken() {
    localStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.tokenKey);
  }

  navigateLogin() {
    this.router.navigate(["/users/login"]);
  }

  navigateMain() {
    this.router.navigate(["/main"]);
  }

}
