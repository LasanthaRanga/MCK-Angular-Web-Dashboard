import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import * as statics from '../../global';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import * as allert from '../../allert';

@Component({
  selector: 'app-tyres',
  templateUrl: './tyres.component.html',
  styleUrls: ['./tyres.component.css']
})
export class TyresComponent implements OnInit {

  urlVehicle = statics.ip + 'vehicle/';
  mg: allert.Globle;
  basicID;
  number;
  active = true;
  userId;
  anableDeactive = false;

  size;
  idTyre;
  day;
  make;
  amount;
  makerNumber;
  status;
  deactiveComment;
  positions;
  position;
  mr;

  inputval = '';





  displayedColumns: string[] = ['day', 'mr', 'position', 'make', 'idTayarReplace'];
  dataSource = <any>[];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private http: HttpClient,
    private router: Router,
    private datePipe: DatePipe,
    private ar: ActivatedRoute

  ) {
    const arrr = JSON.parse(sessionStorage.getItem('loged'));
    this.userId = arrr[0].idUser;
    this.mg = new allert.Globle();
  }

  ngOnInit() {
    this.ar.params.subscribe(params => {
      this.basicID = params.id;
      if (this.basicID && this.basicID > 0) {
        this.getNumber();
        this.getTyreSize();
        this.getTyrePosition();
        this.loadTyres(1);
      } else { }
    });
  }

  getTyreSize() {
    this.http.post(this.urlVehicle + 'getTyreSize', { id: this.basicID }).subscribe(res => {
      this.size = res[0];
      console.log(res);
    });
  }

  getTyrePosition() {
    this.http.post(this.urlVehicle + 'getWheel', {}).subscribe(res => {
      this.positions = res;
      console.log(res);
    });
  }



  getNumber() {
    this.http.post(this.urlVehicle + 'getNumber', { id: this.basicID }).subscribe(res => {
      this.number = res[0].V_provincecode + '  ' + res[0].vbf_regno1;
    });
  }

  loadTyres(st) {
    console.log('Load');
    this.http.post<any>(this.urlVehicle + 'getTyres', { id: this.basicID, status: st }).subscribe(res => {
      console.log(res);
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applayFilter(text) {
    this.dataSource.filter = text.trim().toLocaleLowerCase();
  }

  filterDeactive() {
    console.log(this.active);
    if (this.active) {
      this.loadTyres(1);
    } else {
      this.loadTyres(2);
    }
  }
  anable() {
    console.log(this.deactiveComment);
    if (this.deactiveComment && this.deactiveComment.length > 3) {
      this.anableDeactive = true;
    } else {
      this.anableDeactive = false;
    }
  }

  save() {
    const ty = {
      day: new DatePipe('en').transform(this.day, 'yyyy-MM-dd'),
      make: this.make,
      amount: this.amount,
      makerNumber: this.makerNumber,
      position: this.position,
      basicID: this.basicID,
      userId: this.userId,
      mr: this.mr,
    };

    console.log(ty);

    if (ty.makerNumber && ty.makerNumber.length > 2 && ty.make && ty.make.length > 2 &&
      ty.day && ty.amount >= 0 && ty.position && ty.mr >= 0) {
      this.http.post(this.urlVehicle + 'saveTyre', ty).subscribe(res => {
        this.loadTyres(1);
        this.mg.message('success', 'License');
      });
    } else {
      this.mg.message('warning', 'Enter Valid Data');
    }
  }

  select(item) {
    console.log(item);

    this.idTyre = item.idTayarReplace;
    this.day = new DatePipe('en').transform(item.day, 'yyyy-MM-dd');
    this.make = item.make;
    this.amount = item.amount;
    this.makerNumber = item.makerNumber;
    this.status = item.status;
    this.deactiveComment = item.deactiveComment;
    this.position = item.id;
    this.mr = item.mr;

  }

  clearItem() {
    this.idTyre = null;
    this.day = null;
    this.make = null;
    this.amount = null;
    this.makerNumber = null;
    this.status = null;
    this.deactiveComment = null;
    this.position = null;
    this.mr = null;

  }

  deactive() {
    const comment = {
      comment: this.deactiveComment,
      idTayarReplace: this.idTyre
    };
    this.http.post(this.urlVehicle + 'deactiveTyre', comment).subscribe(res => {
      this.mg.message('success', 'Deactivated');
      console.log(res);
      this.loadTyres(1);
      this.clearItem();
    });
  }


}
