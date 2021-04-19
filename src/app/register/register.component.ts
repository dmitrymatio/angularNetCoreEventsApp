import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],

})
export class RegisterComponent implements OnInit {

  public site = 'https://localhost:5001/api';

  hide = true;
  password = '';
  confirmPassword = '';
  username = '';
  firstName = '';
  lastName = '';

  token = '';
  message = 'Not logged in.';

  _currentUser = '';

  secureData: string = '';
  managerData: string = '';
  reqInfo: any = {};
  msgFromServer: string = '';


  constructor(private http: HttpClient, private router: Router) {
  }


  ngOnInit(): void {
  }

    //------------------------------------------------------------
  // Register attendee.
  //------------------------------------------------------------
  register() {
    let url = this.site + "/register";

    // This free online service receives post submissions.
    this.http.post(url, {
      Email: this.username,
      FirstName: this.firstName,
      LastName: this.lastName,
      Password: this.password,
      ConfirmPassword: this.confirmPassword,
    })
      .subscribe(
        // Data is received from the post request.
        (data) => {
          // Inspect the data to know how to parse it.
          console.log(JSON.stringify(data));

          if (data["tokenString"] != null) {
            this.token = data["tokenString"]
            this._currentUser = data["currentUser"]
            sessionStorage.setItem('auth_token', data["tokenString"]);
            sessionStorage.setItem('current_user', data["currentUser"]);

            this.message = "The user has been registered."
            this.router.navigate(['/']);
          }
        },
        // An error occurred. Data is not received.
        error => {
          alert(JSON.stringify(error));
        });
  }

}
