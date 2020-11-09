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


  idService;
  date;
  meeter;
  comment;
  deactiveComment;
  status;

  typess;
  selectedType;

  idOilPart;
  name;
  qty;
  value;

  partsList = [];
  paList;
  total = 0;

  inputval = '';



  displayedColumns: string[] = ['types', 'date', 'meeter', 'total', 'idService'];
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
        this.getTypes();
        // this.getAuthos();
        this.loadLicens(1);
      } else { }
    });
  }

  getTypes() {
    this.http.post(this.urlVehicle + 'getServiceTypes', {}).subscribe(res => {
      this.typess = res;
      console.log(this.typess);
    });
  }



  addParts() {
    this.total = 0;
    const part = {
      name: this.name,
      qty: this.qty,
      value: this.value
    };
    this.clearAddedItem();
    this.partsList.push(part);
    this.partsList.forEach(el => {
      this.total += el.value;
    });
  }

  remove(ell) {
    var list = [];
    this.partsList.forEach(eleme => {
      if (ell != eleme) {
        list.push(eleme);
      } else {
        this.total -= ell.value;
      }
    });
    this.partsList = list;
  }



  getNumber() {
    this.http.post(this.urlVehicle + 'getNumber', { id: this.basicID }).subscribe(res => {
      this.number = res[0].V_provincecode + '  ' + res[0].vbf_regno1;
    });
  }

  loadLicens(st) {
    console.log("load");
    this.http.post<any>(this.urlVehicle + 'getServices', { id: this.basicID, status: st }).subscribe(res => {
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
    const sv = {
      basicID: this.basicID,
      number: this.number,
      date: new DatePipe('en').transform(this.date, 'yyyy-MM-dd'),
      stype: this.selectedType,
      meeter: this.meeter,
      total: this.total,
      partsList: this.partsList
    };

    if (sv.basicID > 0 && sv.date && sv.stype && sv.meeter && sv.meeter > 0) {
      this.http.post(this.urlVehicle + 'saveService', sv).subscribe(res => {
        this.loadLicens(1);
        this.mg.message('success', 'Service');
        this.clearItem();
      });
    } else {
      this.mg.message('warning', 'Enter Valid Data');
    }
  }

  select(item) {
    this.idService = item.idService;
    this.date = new DatePipe('en').transform(item.date, 'yyyy-MM-dd');
    this.meeter = item.meeter;
    this.status = item.status;
  }

  getParts(idReplace) {
    this.http.post(this.urlVehicle + 'getServiceOils', { id: this.idService }).subscribe(res => {
      this.paList = res;
      this.partsList = this.paList;
    });
  }

  clearAddedItem() {
    this.name = ' ';
    this.qty = ' ';
    this.value = 0;
  }

  clearItem() {
    this.idService = null;
    this.date = null;
    this.meeter = null;
    this.status = 1;
  }

  deactive() {
    const comment = {
      comment: this.deactiveComment,
      idService: this.idService
    };
    // this.http.post(this.urlVehicle + 'deactiveLicense', comment).subscribe(res => {
    //   this.mg.message('success', 'Deactivated');
    //   console.log(res);
    //   this.loadLicens(1);
    //   this.clearItem();
    // });
  }

}
