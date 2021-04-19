import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  secureData: string = '';
  managerData: string = '';
  reqInfo: any = {};
  msgFromServer: string = '';

  _currentUser = '';

  token = '';
  message = 'Not logged in.';

  userRole: string;
  firstName: string;
  lastName: string;


  constructor(private http: HttpClient, private router: Router, private data: DataService) {
    this.showContentIfLoggedIn();
  }

  ngOnInit(): void {
    this.data.currentRole.subscribe(role => this.userRole = role)
    this.data.currentFirstName.subscribe(firstName => this.firstName = firstName)
    this.data.currentLastName.subscribe(lastName => this.lastName = lastName)
  }

  //------------------------------------------------------------
  // Either shows content when logged in or clears contents.
  //------------------------------------------------------------
  showContentIfLoggedIn() {
    // Logged in if token exists in browser cache.
    if (sessionStorage.getItem('auth_token') != null) {
      this.token = sessionStorage.getItem('auth_token');
      this._currentUser = sessionStorage.getItem('current_user');
      this.message = "The user has been logged in.";
      this.userRole = sessionStorage.getItem("role");
      this.firstName = sessionStorage.getItem("first_name");
      this.lastName = sessionStorage.getItem("last_name");

    }
    else {
      this.message = "Not logged in.";
      this.token = ''
      this._currentUser = '';
      this.userRole = "";
      this.firstName = "";
      this.lastName = "";
    }
  }

  //------------------------------------------------------------
  // Log user out. Destroy token.
  //------------------------------------------------------------
  logout() {
    sessionStorage.clear();
    this.showContentIfLoggedIn();

    // Clear data.
    this.secureData = "";
    this.managerData = "";
    this.reqInfo = {};
    this.msgFromServer = "";

    this.router.navigate(['/login']);

  }

}
