import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from '../../ApiService';


@Component({
  selector: 'app-eventcreate',
  templateUrl: './eventcreate.component.html',
  styleUrls: ['./eventcreate.component.css']
})
export class EventcreateComponent implements OnInit {
  _apiService: ApiService;

  public site = 'https://localhost:5001/api';

  token = '';
  message = 'Not logged in.';

  _currentUser = '';

  secureData: string = '';
  managerData: string = '';
  reqInfo: any = {};
  msgFromServer: string = '';

  date: Date;
  time: string;
  eventName: string;
  description: string;

  constructor(private http: HttpClient, private router: Router) {
    // Pass in http module and pointer to AppComponent.
    this._apiService = new ApiService(http, this);
  }

  ngOnInit(): void {
  }

  postSecureEvent() {
    let dataObject = {
      "date": this.date,
      "time": this.time,
      "eventName": this.eventName,
      "description": this.description,
      "eventAttendee": []
    };

    console.log(dataObject);
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
