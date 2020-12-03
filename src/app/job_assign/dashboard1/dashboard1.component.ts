import { Component, OnInit } from '@angular/core';
import * as statics from '../../global';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-dashboard1',
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.css']
})
export class Dashboard1Component implements OnInit {
  name;
  url = statics.ip + 'userlogin/';
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getNames();
  }

  getNames() {
    this.http.post(this.url + 'keyval', { key: 'name' }).subscribe(res => {
      this.name = res[0].value;
    });
  }

}
