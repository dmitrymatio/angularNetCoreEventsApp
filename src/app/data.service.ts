import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private role = new BehaviorSubject<string>('');
  private firstName = new BehaviorSubject<string>('');
  private lastName = new BehaviorSubject<string>('');
  currentRole = this.role.asObservable();
  currentFirstName = this.firstName.asObservable();
  currentLastName = this.lastName.asObservable();


  constructor() {
    if (sessionStorage.getItem('auth_token')) {
      this.changeRole(sessionStorage.getItem('role'));
      this.changeFirstName(sessionStorage.getItem('first_name'));
      this.changeLastName(sessionStorage.getItem('last_name'));
    }
  }

  changeRole(role: string) {
    this.role.next(role);
  }

  changeFirstName(firstName: string) {
    this.firstName.next(firstName);
    console.log(firstName);
  }

  changeLastName(lastName: string) {
    this.lastName.next(lastName);
  }
}
