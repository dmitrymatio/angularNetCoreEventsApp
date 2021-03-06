import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../ApiService';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  _apiService: ApiService;
  public site = 'https://localhost:5001/api';
  password = '';
  confirmPassword = '';
  username = '';
  firstName = '';
  lastName = '';

  token = '';
  message = 'Not logged in.';

  _currentUser = '';
  _role = "";

  secureData: string = '';
  managerData: string = '';
  reqInfo: any = {};
  msgFromServer: string = '';

  constructor(private http: HttpClient, private router: Router) {
    // Pass in http module and pointer to AppComponent.
    this._apiService = new ApiService(http, this);
    this.showContentIfLoggedIn();
  }


  //------------------------------------------------------------
  // Either shows content when logged in or clears contents.
  //------------------------------------------------------------
  showContentIfLoggedIn() {
    // Logged in if token exists in browser cache.
    if (sessionStorage.getItem('auth_token') != null) {
      this.token = sessionStorage.getItem('auth_token');
      this.message = "The user has been logged in."
    }
    else {
      this.message = "Not logged in.";
      this.token = ''
    }
  }


  getSecureData() {
    var url = this.site + '/list'

    // Passing in the reference to the callback function.
    this._apiService.getData(url, this.secureDataCallback);
  }


  // Callback needs a pointer '_this' to current instance.
  secureDataCallback(result, _this) {
    if (result.errorMessage == "") {
      _this.secureData = JSON.stringify(result);
    }
    else {
      alert(JSON.stringify(result.errorMessage));
    }
  }

  postSecureEvent() {
    let dataObject = {
      "date": "2021-04-19T02:06:25.530Z",
      "time": "18:00",
      "eventName": "new event",
      "description": "coolest event",
      "eventAttendee": []
    };
    this._apiService.postData('Event', dataObject,
      this.securePostCallback);
  }
  // Callback needs a pointer '_this' to current instance.
  securePostCallback(result, _this) {
    if (result.errorMessage == '') {
      _this.msgFromServer = result['msgFromServer'];
    }
    else {
      alert(JSON.stringify(result.errorMessage));
    }
  }
}
