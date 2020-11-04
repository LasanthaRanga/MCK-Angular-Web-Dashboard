import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as statics from '../../global';
import * as allert from '../../allert';
import { Session } from 'protractor';
@Component({
  selector: 'app-mapapprove',
  templateUrl: './mapapprove.component.html',
  styleUrls: ['./mapapprove.component.css']
})
export class MapapproveComponent implements OnInit {

  url = statics.ip;
  selected;

  propid;
  description;
  user_id;
  mg;

  constructor(private http: HttpClient) {

    const arrr = JSON.parse(sessionStorage.getItem('loged'));
    this.user_id = arrr[0].idUser;
    this.mg = new allert.Globle();
  }

  dataSource = <any>[];
  displayedColumns: string[] = ['fullname', 'owner_name', 'application_name', 'mobile', 'idOnCusProp'];

  favoriteSeason: string;
  seasons: string[] = ['Pending', 'Approved', 'Rejected'];

  ngOnInit() {
    this.loadProperty(2, 0);
  }

  changeStatus(season) {
    console.log(season);

    if (season === 'Pending') {
      this.loadProperty(2, 0);
    }
    if (season === 'Approved') {
      this.loadProperty(2, 1);
    }
    if (season === 'Rejected') {
      this.loadProperty(2, 2);
    }

  }


  loadProperty(cat, sta) {
    this.http.post(this.url + 'onlinecuspro/allprop', {
      catid: cat, status: sta
    }).subscribe(
      res => { this.dataSource = res; console.log(res); },
      err => { console.log(err); }
    );
  }

  loadOne(id) {
    console.log(id);
    this.http.post(this.url + 'onlinecuspro/selectedMap', {
      mapid: id
    }).subscribe(
      res => {
        this.selected = res[0];
        console.log(this.selected);
      },
      err => { console.log(err); }
    );



  }

  confirm() {
    console.log("confirm");
    console.log(this.propid + '   ' + this.description);
    console.log(this.selected.idOnCus);



    const param = { status: 1, uid: this.user_id, propid: this.propid, des: this.description, id: this.selected.idOnCusProp };
    console.log(param);
    this.http.post(this.url + 'onlinecuspro/approve', param).subscribe((data) => {
      console.log(data);
      this.loadProperty(2, 0);
      this.selected = null;
      this.propid = null;
      this.description = null;
      this.mg.message('success', 'Approved');

    });

  }
  reject() {
    console.log("Reject");
    console.log(this.propid + '   ' + this.description);
    const param = { status: 2, uid: this.user_id, propid: this.propid, des: this.description, id: this.selected.idOnCusProp };
    console.log(param);
    this.http.post(this.url + 'onlinecuspro/approve', param).subscribe((data) => {
      console.log(data);
      this.loadProperty(2, 0);
      this.selected = null;
      this.propid = null;
      this.description = null;
      this.mg.message('success', 'Rejected');

    });
  }



}
