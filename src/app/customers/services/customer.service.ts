import { Injectable } from '@angular/core';
import { Customer } from '../model/customer'
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseUrl = "/api/customer";

  private customerChanged = new Subject<Customer>();
  customerChanged$ = this.customerChanged.asObservable();

  constructor(private http: HttpClient) {

  }

  get(id: string): Observable<Customer> {
    var url = this.getObjectUrl(id);
    return this.http.get<Customer>(url);
  }

  getAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseUrl);
  }


  add(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.baseUrl, customer).pipe(
      tap(c => {
        this.customerChanged.next(c);
      })
    );
  }

  update(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(this.baseUrl, customer).pipe(
      tap(c => {
        this.customerChanged.next(c);
      }));
  }

  delete(id: string): Observable<any> {
    var url = this.getObjectUrl(id);
    return this.http.delete(url).pipe(
      tap(c => {
        this.customerChanged.next(c);
      }));
  }

  getObjectUrl(id: string): string {
    return `${this.baseUrl}/${id}`;
  }
}
