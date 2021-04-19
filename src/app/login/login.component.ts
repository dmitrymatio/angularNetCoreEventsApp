import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from '../data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;

  public site = 'https://localhost:5001/api';
  password = '';
  confirmPassword = '';
  username = '';
  firstName = '';
  lastName = '';

  token = '';
  message = 'Not logged in.';

  _currentUser = '';
  _userRole = [];
  _role = "";
  _firstName ="";
  _lastName ="";


  secureData: string = '';
  managerData: string = '';
  reqInfo: any = {};
  msgFromServer: string = '';


  constructor(private http: HttpClient, private router: Router, private data: DataService) { }

  ngOnInit(): void {
    this.data.currentRole.subscribe(role => this._role = role)
  }

  //------------------------------------------------------------
  // Log user in.
  //------------------------------------------------------------
  login() {
    let url = this.site + "/login";

    // This free online service receives post submissions.
    this.http.post(url, {
      Email: this.username,
      Password: this.password,
      RememberMe: false
    })
      .subscribe(
        // Data is received from the post request.
        (data) => {
          // Inspect the data to know how to parse it.
          console.log(JSON.stringify(data));

          if (data["tokenString"] != null) {
            this.token = data["tokenString"]
            this._currentUser = data["currentUser"]
            this._userRole = data["role"]
            this._firstName = data["firstName"]
            this._lastName = data["lastName"]

            sessionStorage.setItem('auth_token', data["tokenString"]);
            sessionStorage.setItem('current_user', data["currentUser"]);
            sessionStorage.setItem('first_name', data["firstName"]);
            sessionStorage.setItem('last_name', data["lastName"]);

            this.message = "The user has been logged in."
            if (this._userRole.length === 0) {
              this._role = "Attendee";
              sessionStorage.setItem('role', "Attendee");
              this.newRole();
              this.newFirstName();
              this.newLastName()
              this.router.navigate(['/main']);
            } else {
              if (this._userRole[0].roleId === "Admin") {
                this._role = "Admin";
                sessionStorage.setItem('role', "Admin");
                this.newRole();
                this.router.navigate(['/manage']);
              }
            }
          }
        },
        // An error occurred. Data is not received.
        error => {
          alert(JSON.stringify(error));
        });
  }

  newRole() {
    this.data.changeRole(this._role);
  }


  newFirstName() {
    this.data.changeFirstName(this._firstName);
  }


  newLastName() {
    this.data.changeLastName(this._lastName);
  }

}
