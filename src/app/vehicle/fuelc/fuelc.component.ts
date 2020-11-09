import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import * as statics from '../../global';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import * as allert from '../../allert';
@Component({
  selector: 'app-fuelc',
  templateUrl: './fuelc.component.html',
  styleUrls: ['./fuelc.component.css']
})
export class FuelcComponent implements OnInit {
  urlVehicle = statics.ip + 'vehicle/';
  mg: allert.Globle;
  basicID;
  number;
  active = true;

  anableDeactive = false;

  idFuelC;
  resarchDate;
  auditor;
  userId;
  withLoad;
  withoutLoad;
  status;
  comment;
  deactiveComment;



  inputval = '';
  displayedColumns: string[] = ['resarch_date', 'auditor', 'with_load', 'without_load', 'idFuelC'];
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
        this.loadFuelc(1);
      } else { }
    });
  }

  getNumber() {
    this.http.post(this.urlVehicle + 'getNumber', { id: this.basicID }).subscribe(res => {
      this.number = res[0].V_provincecode + '  ' + res[0].vbf_regno1;
    });
  }

  loadFuelc(st) {
    this.http.post<any>(this.urlVehicle + 'getFuelc', { id: this.basicID, status: st }).subscribe(res => {
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
      this.loadFuelc(1);
    } else {
      this.loadFuelc(2);
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
    const fc = {
      number: this.number,
      resarchDate: new DatePipe('en').transform(this.resarchDate, 'yyyy-MM-dd'),
      auditor: this.auditor,
      userId: this.userId,
      withLoad: this.withLoad,
      withoutLoad: this.withoutLoad,
      comment: this.comment,
      basicID: this.basicID
    };

    if (fc.auditor && fc.auditor.length > 3 && fc.resarchDate && fc.withLoad && fc.withoutLoad) {
      this.http.post(this.urlVehicle + 'saveFuelc', fc).subscribe(res => {
        console.log(res);
        this.loadFuelc(1);
        this.mg.message('success', 'Fuel Consumption');
        this.clearItem();
      });
    } else {
      this.mg.message('warning', 'Enter Valid Data');
    }



  }

  select(item) {
    this.resarchDate = new DatePipe('en').transform(item.resarch_date, 'yyyy-MM-dd');
    this.idFuelC = item.idFuelC;
    this.auditor = item.auditor;
    this.withLoad = item.with_load;
    this.withoutLoad = item.without_load;
    this.comment = item.comment;
    this.status = item.status;
  }

  clearItem() {
    this.resarchDate = null;
    this.idFuelC = null;
    this.auditor = null;
    this.withLoad = null;
    this.withoutLoad = null;
    this.comment = null;
  }

  deactive() {
    const comment = {
      comment: this.deactiveComment,
      idFuelC: this.idFuelC
    };
    this.http.post(this.urlVehicle + 'deactiveFuelc', comment).subscribe(res => {
      this.mg.message('success', 'Fuel Deactivated');
      console.log(res);
      this.loadFuelc(1);
      this.clearItem();
    });
  }

}
