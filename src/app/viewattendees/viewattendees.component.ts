import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../../ApiService';
import { Router, ActivatedRoute, Params } from '@angular/router'; //import router

@Component({
  selector: 'app-viewattendees',
  templateUrl: './viewattendees.component.html',
  styleUrls: ['./viewattendees.component.css']
})
export class ViewattendeesComponent implements OnInit {
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

  event: any;
  attendees: any;
  managerData: string = '';
  reqInfo: any = {};
  msgFromServer: string = '';


  constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) {
    this._apiService = new ApiService(http, this);
  }

  public id: string;

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id);
    this.getEvent(this.id);
    this.getAttendees(this.id);
  }


  getEvent(eventId) {
    var url = this.site + '/Event/getOne?EventId=' + eventId;

    // Passing in the reference to the callback function.
    this._apiService.getData(url, this.attendEventCallback);
  }

  // Callback needs a pointer '_this' to current instance.
  attendEventCallback(result, _this) {
    if (result.errorMessage == "") {
      _this.event = result.eventArray;
      console.log(JSON.stringify(_this.event));
    }
    else {
      alert(JSON.stringify(result.errorMessage));
    }
  }

  getAttendees(eventId) {
    var url = this.site + '/Event/GetAttendees?EventId=' + eventId;

    // Passing in the reference to the callback function.
    this._apiService.getData(url, this.attendeesCallback);
  }

  // Callback needs a pointer '_this' to current instance.
  attendeesCallback(result, _this) {
    if (result.errorMessage == "") {
      _this.attendees = result.eventArray.attendeeList;
      console.log(JSON.stringify(_this.attendees));
    }
    else {
      alert(JSON.stringify(result.errorMessage));
    }
  }
}
