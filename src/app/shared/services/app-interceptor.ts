import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {

  }


  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    let headers = {
      'Content-Type': 'application/json'
    };

    let token = this.authService.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    req = req.clone({
      setHeaders: headers
    });

    return next.handle(req).pipe(
      tap(event => {
        // There may be other events besides the response.
        if (event instanceof HttpResponse) {

        }
      }, error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            // redirect to the login route
            // or show a modal
          }
        }
      }));

  }
}
