import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../model/login';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { tap } from 'rxjs/operators';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl = "/api/user";

  constructor(private http: HttpClient, private auth: AuthService) { }


  isAuthenticated(): boolean {
    return !!this.auth.getToken();
  }

  login(login: Login): Observable<any> {
    let url = `${this.baseUrl}/signin`;
    return this.http.post<Login>(url, login).pipe(
      tap(r => {
        if (r && r.token) {
          this.auth.setToken(r.token, login.permanent);
        }
      })
    );
  }


  signUp(login: Login): Observable<any> {
    return this.http.post<Login>(this.baseUrl, login);
  }


  get(): Observable<User> {
    return this.http.get<User>(this.baseUrl);
  }

  logout(): Observable<any> {
    this.auth.removeToken();
    return of<any>(null);
  }


}
