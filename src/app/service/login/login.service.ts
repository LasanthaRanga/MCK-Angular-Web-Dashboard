import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Observable } from 'rxjs';
import { Iprivilage } from 'src/app/pojo/privilage';
import * as statics from '../../global';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  private _urluser = statics.ip + 'userlogin';
  private _urlprivilage = statics.ip + 'privilage';


  constructor(private http: HttpClient, private router: Router, private _appComponent: AppComponent) {
  }



  isLoged = false;

  login(uname: string, pword: string) {
    let jobT = { uname: uname, pword: pword };
    this.http.post(this._urluser, jobT
    ).subscribe(data => {
      try {
        const arr = JSON.stringify(data['data']);

        if (data['type'] === 1) {

          sessionStorage.setItem('utype', '1');


          if (arr != null && arr.length > 4) {
            sessionStorage.setItem('loged', JSON.stringify(data['data']));
            this.isLoged = true;
            let loged = JSON.parse(JSON.stringify(data['data']));
            const iduser = loged[0].idUser;


            this.http.post(this._urlprivilage, { id: iduser }).subscribe(data2 => {
              this.privilages = null;
              this.privilages = JSON.parse(JSON.stringify(data));
              localStorage.setItem('privilage', JSON.stringify(this.privilages));
              console.log("Privilage Array  -in login sevice " + this.privilages);
            });


            this.http.get(this._urluser + "/getDip/" + iduser).subscribe(dipdata => {
              console.log("==========================    " + dipdata);
              localStorage.setItem('dip', JSON.stringify(dipdata));
            });


            this.http.get(this._urluser + "/getSubjectsByUid/" + iduser).subscribe(dataa => {
              console.log("==========================    " + dataa);
              localStorage.setItem('subs', JSON.stringify(dataa));
            });

            console.log(sessionStorage.getItem('loged'));
            this.router.navigate(['/dash']);
            // window.location.href = "/";
          } else {
            this.router.navigate(['/login']);
            console.log('no data');
          }
        } else if (data['type'] === 2) {

          console.log(JSON.stringify(data['data']));

          sessionStorage.setItem('utype', '2');
          sessionStorage.setItem('loged', JSON.stringify(data['data']));
          console.log("===================================================================");
          console.log(data['type']);
          console.log(arr);
          this.router.navigate(['/onhome']);
          //  window.location.href = "/";

          console.log("===================================================================");

        } else if (data['type'] === 3) {

          console.log('----------');

        }


      } catch (error) {
        console.log(error);
      }
    });
  }

  privilages = [];

  privilage() {
    let iduser = 0;
    let arr = JSON.parse(sessionStorage.getItem('loged'));
    if (arr != null && arr.length > 0) {
      iduser = arr[0].idUser;
    }

    this.http.post(this._urlprivilage, { id: iduser }
    ).subscribe(data => {
      this.privilages = null;
      this.privilages = JSON.parse(JSON.stringify(data));
      sessionStorage.setItem('privilage', JSON.stringify(this.privilages));
      console.log(this.privilages);
    });
  }


  logOut() {
    this.isLoged = false;
    console.log("Log OUT");
    sessionStorage.removeItem('loged');
    localStorage.removeItem('privilage');
    localStorage.removeItem('subs');
    sessionStorage.removeItem('utype');
    this.router.navigate(['/home']);
    // window.location.href = "";

  }

  checkLog = (): boolean => {
    return this.isLoged;
  }

  getPrivilage(): any {
    this.http.post(this._urlprivilage, {})
      .subscribe(
        (data: any[]) => {
          if (data.length) {
            // console.log(data);
            return data;
          }
        }
      );
  }


  getDipartmentLogUser(uid: number) {
    this.http.get(this._urluser + "/getDip/" + uid).subscribe(data => {
      console.log("==========================    " + data);
      localStorage.setItem('dip', JSON.stringify(data));
    });
  }


  getPrivilages(): Observable<Iprivilage[]> {
    return this.http.get<Iprivilage[]>(this._urlprivilage);
  }


  hasPrivilage(link: string, to: string) {
    let allow = false;
    let priv = JSON.parse(sessionStorage.getItem('privilage'));
    for (let xx in priv) {
      //console.log(xx);
      if (priv[xx].routerLink == link) {
        allow = true;
        break;
      }
    }
    if (allow) {
      this.router.navigate([link]);
      // console.log("redirect");
    } else {
      this.router.navigate([to]);
      //  console.log("Not Redirect");
    }
  }



  getUserLevel(): number {
    let level = 0;
    let loged = JSON.parse(sessionStorage.getItem('loged'));
    let ll = loged[0].user_level;
    if (ll != null) {
      level = ll;
    }
    return level;
  }



}
