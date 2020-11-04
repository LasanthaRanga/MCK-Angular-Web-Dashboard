import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import * as statics from '../../global';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import * as allert from '../../allert';

@Component({
  selector: 'app-servce',
  templateUrl: './servce.component.html',
  styleUrls: ['./servce.component.css']
})
export class ServceComponent implements OnInit {

  urlVehicle = statics.ip + 'vehicle/';
  mg: allert.Globle;
  basicID;
  number;
  active = true;
  userId;
  anableDeactive = false;


  idLicense;
  no;
  from;
  to;
  day;
  amount;
  status;
  comment;
  deactiveComment;

  types;
  selectedType;

  authorities;
  selectedAutho;


  inputval = '';



  displayedColumns: string[] = ['licensType', 'from', 'to', 'number', 'date', 'idLicense'];
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
        // this.getTypes();
        // this.getAuthos();
        // this.loadLicens(1);
      } else { }
    });
  }

  getTypes() {
    this.http.post(this.urlVehicle + 'getLicenseTypes', {}).subscribe(res => {
      this.types = res;

    });
  }

  getAuthos() {
    this.http.post(this.urlVehicle + 'getLicenseAuthority', {}).subscribe(res => {
      this.authorities = res;

    });
  }

  getNumber() {
    this.http.post(this.urlVehicle + 'getNumber', { id: this.basicID }).subscribe(res => {
      this.number = res[0].V_provincecode + '  ' + res[0].vbf_regno1;
    });
  }

  loadLicens(st) {
    console.log("load");
    this.http.post<any>(this.urlVehicle + 'getLicens', { id: this.basicID, status: st }).subscribe(res => {
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
      this.loadLicens(1);
    } else {
      this.loadLicens(2);
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
    const li = {
      basicID: this.basicID,
      number: this.number,
      from: new DatePipe('en').transform(this.from, 'yyyy-MM-dd'),
      to: new DatePipe('en').transform(this.to, 'yyyy-MM-dd'),
      day: new DatePipe('en').transform(this.day, 'yyyy-MM-dd'),
      no: this.no,
      type: this.selectedType,
      autho: this.selectedAutho,
      amount: this.amount
    };

    // if (li.no && li.no.length > 3 && li.from && li.to && li.day && li.type && li.autho) {
    //   this.http.post(this.urlVehicle + 'saveLicense', li).subscribe(res => {
    //     this.loadLicens(1);
    //     this.mg.message('success', 'License');
    //   });
    // } else {
    //   this.mg.message('warning', 'Enter Valid Data');
    // }
  }

  select(item) {

  }

  clearItem() {

  }

  deactive() {
    const comment = {
      comment: this.deactiveComment,
      idLicense: this.idLicense
    };
    // this.http.post(this.urlVehicle + 'deactiveLicense', comment).subscribe(res => {
    //   this.mg.message('success', 'Deactivated');
    //   console.log(res);
    //   this.loadLicens(1);
    //   this.clearItem();
    // });
  }

}
