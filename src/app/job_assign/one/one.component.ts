import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import * as statics from '../../global';


@Component({
  selector: 'app-one',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.css']
})


export class OneComponent implements OnInit {

  url = statics.ip + 'unique/';
  uniquid = 0;
  steps;
  uniquedata = {
    idUnique: 0,
    customer_id: 3,
    cus_nic: '',
    cus_name: '',
    appcat_id: 3,
    app_id: 500,
    mobile: '',
    conferm_code: null,
    rating: null,
    start_at: '',
    location: '',
    old_uinque_id: null,
    status: 0,
    application_name: ''
  }

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.route.params.subscribe(params => {
      if (params.id != null) {
        this.uniquid = params.id;
        this.loadSteps();
        this.loadAppData();
      }
    });
  }

  ngOnInit() {

  }

  loadSteps() {
    this.http.get(this.url + 'steps/' + this.uniquid).subscribe(data => {
      this.steps = data;
    });
  }

  loadAppData() {
    this.http.get(this.url + 'appdata/' + this.uniquid).subscribe(data => {
      this.uniquedata = data[0];
    });
  }

}
