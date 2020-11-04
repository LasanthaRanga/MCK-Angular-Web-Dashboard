import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as statics from '../../global';
import * as allert from '../../allert';
import { LoginService } from '../../../app/service/login/login.service';


@Component({
  selector: 'app-pmap',
  templateUrl: './pmap.component.html',
  styleUrls: ['./pmap.component.css']
})
export class PmapComponent implements OnInit {

  fullname = '';
  mobile = '';
  nic = '';
  email = '';
  cusid = 0;
  mg = null;
  url = statics.ip;




  constructor(private http: HttpClient, private login: LoginService) {
    this.mg = new allert.Globle();
  }

  dataSource = <any>[];
  displayedColumns: string[] = ['idSubject', 'subject_name', 'subject_code', 'dip_name'];




  ngOnInit() {
    let xx = sessionStorage.getItem('loged');
    let yy = JSON.parse(xx);
    this.fullname = yy[0].fullname;
    this.mobile = yy[0].mobile;
    this.nic = yy[0].nic;
    this.email = yy[0].email;
    this.cusid = yy[0].idOnline;



  }

  map(form: NgForm) {
    console.log(form.value.owner);
    console.log(form.value.kform);
    console.log(form.value.recit);

    let ma = {
      idoncus: this.cusid,
      owner: form.value.owner,
      kform: form.value.kform,
      recit: form.value.recit,
      des: form.value.des
    };

    this.http.post(this.url + 'onlinecuspro/map', ma).subscribe(
      res => {
        console.log(res);
        form.reset();
        this.mg.message('success', 'Added to property list');
      },
      err => { console.log(err); }
    );


  }

  logOut() {
    this.login.logOut();
  }

}
