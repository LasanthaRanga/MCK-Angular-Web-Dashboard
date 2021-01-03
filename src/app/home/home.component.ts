import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login/login.service';
import * as statics from '../global';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  url = statics.ip + 'userlogin/';

  name;

  constructor(private router: Router, private login: LoginService, private http: HttpClient) {
    this.getNames();
  }

  isLogin = false;

  ngOnInit() {
    let arr = JSON.parse(sessionStorage.getItem('loged'));
    if (arr != null) {
      console.log("Logie IN")
      this.isLogin = true;
    } else {
      console.log("Not loged");
      this.isLogin = false;
    }

  }

  getNames() {
    this.http.post(this.url + 'keyval', { key: 'name' }).subscribe(res => {
      this.name = res[0].value;
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
  logOut() {
    this.login.logOut();
  }



}
