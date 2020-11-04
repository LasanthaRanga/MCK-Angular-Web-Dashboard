import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as statics from '../../global';
import * as allert from '../../allert';
import { LoginService } from '../../../app/service/login/login.service';

@Component({
  selector: 'app-onhome',
  templateUrl: './onhome.component.html',
  styleUrls: ['./onhome.component.css']
})
export class OnhomeComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient, private login: LoginService) { }


  dataSource = <any>[];
  displayedColumns: string[] = ['application_name', 'owner_name', 'status'];

  url = statics.ip;
  fullname = '';
  mobile = '';
  nic = '';
  email = '';
  cusid = 0;
  kformid;



  ngOnInit() {

    let xx = sessionStorage.getItem('loged');
    let yy = JSON.parse(xx);
    // console.log(yy);
    this.fullname = yy[0].fullname;
    this.mobile = yy[0].mobile;
    this.nic = yy[0].nic;
    this.email = yy[0].email;
    this.cusid = yy[0].idOnline;
    this.loadMyProperty();
  }

  gotoMap() {
    this.router.navigate(['/pmap']);
  }


  loadMyProperty() {
    this.http.post(this.url + 'onlinecuspro/prop', { idoncus: this.cusid }).subscribe(
      res => {
        this.dataSource = res;
        console.log(res);
      },
      err => {

      }
    );

  }


  goToProperty(id, cat) {
    if (cat == 2) {
      this.router.navigate(['/payassess/' + id]);
    }

  }

  gotoPay() {

    console.log(this.kformid);
    if (this.kformid > 0) {

      this.router.navigate(['/payassess/' + this.kformid]);
    }
  }

  logOut() {
    this.login.logOut();
  }
}
