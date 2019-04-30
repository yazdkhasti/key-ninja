import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  commands: { [name: string]: Subject<any>; } = {};

  constructor() {
  }

  register<T>(name: string) {
    var subject = this.commands[name];
    if (!subject) {
      subject = new Subject<T>();
      this.commands[name] = subject;
    } else {
      throw "Command already registered";
    }
  }

  publish(name: string, data: any) {
    var subject = this.commands[name];
    if (!subject) {
      throw "Command not registered";
    }
    subject.next(data);
  }

  get<T>(name: string): Observable<T> {
    var subject = this.commands[name];
    if (!subject) {
      throw "Command not registered";
    }
    return subject.asObservable();
  }
}
