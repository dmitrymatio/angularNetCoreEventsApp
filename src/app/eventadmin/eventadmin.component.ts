import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../../ApiService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eventadmin',
  templateUrl: './eventadmin.component.html',
  styleUrls: ['./eventadmin.component.css']
})
export class EventadminComponent implements OnInit {
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
    this._apiService = new ApiService(http, this);
    this.getSecureData();
  }

  ngOnInit(): void {
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
  getDeleteEvent(eventId) {
    var url = this.site + '/Event/Delete?EventId=' + eventId;

    // Passing in the reference to the callback function.
    this._apiService.getData(url, this.deleteEventCallback);
  }

  // Callback needs a pointer '_this' to current instance.
  deleteEventCallback(result, _this) {
    if (result.errorMessage == "") {
      alert(JSON.stringify(result));
      _this.getSecureData();

    }
    else {
      alert(JSON.stringify(result.errorMessage));
    }
  }


  getAttendEvent(eventId) {
    var url = this.site + '/Event/AttendEvent?EventId=' + eventId;

    // Passing in the reference to the callback function.
    this._apiService.getData(url, this.attendEventCallback);
  }

  // Callback needs a pointer '_this' to current instance.
  attendEventCallback(result, _this) {
    if (result.errorMessage == "") {
      alert(JSON.stringify(result));
    }
    else {
      _this.router.navigate(['/login']);
      alert(JSON.stringify(result.errorMessage));
    }
  }

  getSecureData() {
    var url = this.site + '/event'

    // Passing in the reference to the callback function.
    this._apiService.getData(url, this.secureDataCallback);
  }

  // Callback needs a pointer '_this' to current instance.
  secureDataCallback(result, _this) {
    if (result.errorMessage == "") {
      _this.secureData = result;
      console.log(_this.secureData);

    }
    else {
      alert(JSON.stringify(result.errorMessage));
    }
  }

}
