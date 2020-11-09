import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import * as statics from '../../global';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import * as allert from '../../allert';
import { element } from 'protractor';

@Component({
  selector: 'app-repairs',
  templateUrl: './repairs.component.html',
  styleUrls: ['./repairs.component.css']
})
export class RepairsComponent implements OnInit {

  urlVehicle = statics.ip + 'vehicle/';
  mg: allert.Globle;
  basicID;
  number;
  active = true;
  userId;
  anableDeactive = false;

  deactiveComment;
  inputval = '';

  idReplace;
  inspectedDate;
  replaceDate;
  place;
  description;
  repairCost = 0;
  fullTotal = 0;
  status;
  col1;
  col2;
  col3;
  col4;

  idParts;
  itemName;
  comment;
  waranty;
  reason;
  amount;
  pStatus;
  productCost = 0;


  paList;
  partsList = [];
  total = 0;



  displayedColumns: string[] = ['replace_date', 'place', 'full_total', 'idReplace'];
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
        this.loadReplace(1);
      } else { }
    });
  }

  addItem() {
    this.fullTotal = this.repairCost;
    const item = {
      itemName: this.itemName,
      waranty: this.waranty,
      reason: this.reason,
      amount: this.amount
    };

    if (item.itemName && item.itemName.length > 1 && item.amount >= 0) {
      this.partsList.push(item);
      this.clearAddedItem();
    } else {
      this.mg.message('warning', 'Enter Valid Data');
    }

    this.productCost = 0;

    this.partsList.forEach(el => {
      this.productCost += el.amount;
      this.fullTotal += el.amount;
    });

  }

  clearAddedItem() {
    this.itemName = ' ';
    this.waranty = ' ';
    this.reason = null;
    this.amount = 0;
  }

  calTotal() {
    this.fullTotal = this.repairCost + this.productCost;
  }

  remove(ell) {

    var list = [];
    this.partsList.forEach(eleme => {
      if (ell != eleme) {
        list.push(eleme);
      } else {
        this.productCost -= ell.amount;
        this.fullTotal -= ell.amount;
      }
    });
    this.partsList = list;
  }


  getParts(idReplace) {
    this.http.post(this.urlVehicle + 'getParts', { id: idReplace }).subscribe(res => {
      //  console.log(res);
      this.paList = res;
      this.partsList = this.paList;
    });
  }

  getNumber() {
    this.http.post(this.urlVehicle + 'getNumber', { id: this.basicID }).subscribe(res => {
      this.number = res[0].V_provincecode + '  ' + res[0].vbf_regno1;
    });
  }

  loadReplace(st) {
    console.log("load");
    this.http.post<any>(this.urlVehicle + 'getReplace', { id: this.basicID, status: st }).subscribe(res => {
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
    console.log(this.basicID);
    if (this.active) {
      this.loadReplace(1);
    } else {
      this.loadReplace(2);
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
    const replace = {
      basicID: this.basicID,
      number: this.number,
      inspectedDate: new DatePipe('en').transform(this.inspectedDate, 'yyyy-MM-dd'),
      replaceDate: new DatePipe('en').transform(this.replaceDate, 'yyyy-MM-dd'),
      place: this.place,
      description: this.description,
      repairCost: this.repairCost,
      fullTotal: this.fullTotal,
      col1: this.col1,
      col2: this.col2,
      col3: this.col3,
      col4: this.col4,
      userId: this.userId,
      partsList: this.partsList
    };

    if (replace.inspectedDate && replace.replaceDate) {
      this.http.post(this.urlVehicle + 'saveReplace', replace).subscribe(res => {
        this.loadReplace(1);
        this.mg.message('success', 'Repairs');
        this.clearItem();
      });
    } else {
      this.mg.message('warning', 'Enter Valid Data');
    }
  }

  select(item) {
    console.log(item);
    this.idReplace = item.idReplace;
    this.inspectedDate = new DatePipe('en').transform(item.inspected_date, 'yyyy-MM-dd');
    this.replaceDate = new DatePipe('en').transform(item.replace_date, 'yyyy-MM-dd');
    this.place = item.place;
    this.description = item.description;
    this.repairCost = item.repair_cost;
    this.fullTotal = item.full_total;
    this.status = item.status;

    this.getParts(item.idReplace);



  }

  clearItem() {
    this.inspectedDate = null;
    this.replaceDate = null;
    this.place = null;
    this.description = null;
    this.repairCost = 0;
    this.fullTotal = 0;
    this.col1 = null;
    this.col2 = null;
    this.col3 = null;
    this.col4 = null;
    this.partsList = [];
    this.deactiveComment = null;
    this.idReplace = null;
  }

  deactive() {
    const comment = {
      comment: this.deactiveComment,
      id: this.idReplace
    };
    this.http.post(this.urlVehicle + 'deactiveReplace', comment).subscribe(res => {
      this.mg.message('success', 'Deactivated');
      console.log(res);
      this.loadReplace(1);
      this.clearItem();
    });
  }

}
