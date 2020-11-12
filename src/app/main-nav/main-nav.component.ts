import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginService } from '../service/login/login.service';
import { Iprivilage } from 'src/app/pojo/privilage';
import { HttpClient } from '@angular/common/http';
import { Iloged } from '../pojo/loged';
import * as statics from '../global';
import { element } from 'protractor';


@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {
  private _urlprivilage = statics.ip + 'privilage';
  privilage: Iprivilage;

  isLogin = false;



  constructor(private breakpointObserver: BreakpointObserver, private _login: LoginService, private http: HttpClient) {

  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches),
    shareReplay()
  );

  ngOnInit() {

    //  this.privilages = JSON.parse(localStorage.getItem('privilage'));

    let iduser = 0;
    let arrr = JSON.parse(sessionStorage.getItem('loged'));

    if (arrr != null && arrr.length > 0) {
      iduser = arrr[0].idUser;
    }

    this.http.post(this._urlprivilage, { id: iduser }).subscribe(data => {
      this.privilages = null;
      this.privilages = JSON.parse(JSON.stringify(data));
      console.log(this.privilages);
      sessionStorage.setItem('privilage', JSON.stringify(this.privilages));
      console.log("Privilage Array  -in login sevice " + this.privilages);
      if (this.privilages != null && this.privilages.length > 0) {
        this.isLogin = true;

        this.privilages.forEach(el => {
          this.http.post(this._urlprivilage + '/sub', { id: iduser, main: el.id }).subscribe(da => {
            el.sub = JSON.parse(JSON.stringify(da));
          });
        });


      } else {
        this.isLogin = false;
      }
    });
    // console.log("Navigation Privilage array --  " + this.privilages);
    // this.isLogin = this._login.checkLog();
  }



  privilages = [];

  logOut() {
    this._login.logOut();
  }


}
