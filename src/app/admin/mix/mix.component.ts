import { Component, OnInit, ViewChild  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as statics from '../../global';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import * as allert from '../../allert';

@Component({
  selector: 'app-mix',
  templateUrl: './mix.component.html',
  styleUrls: ['./mix.component.css']
})
export class MixComponent implements OnInit {

  urlmix = statics.ip + 'admin/';
  inputval = '';
  reciptId;
  user;
  description='';
  application_cat;
  removecode;
  maxremoveId:number;
  removeno;
  mg: allert.Globle;


  displayedColumns: string[] = ['receipt_print_no', 'idReceipt'];
  dataSource = <any>[];

  displayedColumnslist:string[]=['remove_rec_no','remove_description'];
  datasouecelist=<any>[];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginatorlist: MatPaginator;
  @ViewChild(MatSort, { static: false }) sortlist: MatSort;
  date : any;
  formatedDate : any;

  constructor(private http: HttpClient, private router: Router,private datePipe: DatePipe) {
    this.mg = new allert.Globle();
  }

  cancle_dt;

  ngOnInit() {
    const arrr = JSON.parse(sessionStorage.getItem('loged'));
    this.user = arrr[0].idUser;
    this.loadrecipt();
    this.getremovelist();
  }

  loadrecipt() {
    this.http.post<any>(this.urlmix + 'getallBills', {}).subscribe(res => {
      console.log(res);
      console.log('done');
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applayFilter(text) {
    this.dataSource.filter = text.trim().toLocaleLowerCase();
  }

  clickOnOne(element) {
    let x = element.idReceipt;
    this.reciptId=x;
    this.getreciptbyId(x);
    console.log('recipt id :'+this.reciptId);
    this.getremovereciptcode();
    this.getcancleorder();
  }

  getreciptbyId(reciptId){
    this.http.post<any>(this.urlmix + 'getreciptdatabyid', { recipid: this.reciptId }).subscribe(res => {
      const data = res[0];
      this.inputval = data.receipt_print_no;
    });
  }

  remove(){
    //if(this.description.isNullOrUndefined)
    this.updatecancleuser();
    this.canclepsthree();
    this.saveremovedetails();
    this.getremovelist();
  }

  updatecancleuser(){
    const data = {
      user: this.user,
      description: this.description,
      recipid: this.reciptId,
      cancle_dt:new DatePipe('en').transform(this.cancle_dt, 'yyyy-MM-dd')
    };
    console.log(data);
    this.http.post<any>(this.urlmix + 'updatecancleuser', data).subscribe(res => {
      const x = res;

    });
  }

  canclepsthree(){
    const data = {
      recipid: this.reciptId
    };
    console.log(data);
    this.http.post<any>(this.urlmix + 'cancelrecipt', data).subscribe(res => {
      const x = res;

    });
  }

  canclemixincome(){
    const data = {
      idmixincome: this.reciptId
    };
    console.log(data);
    this.http.post<any>(this.urlmix + 'canclemixincome', data).subscribe(res => {
      const x = res;
    });
  }

  getremovereciptcode()
  {
    this.http.post<any>(this.urlmix + 'getremovecode', { recipid: this.reciptId }).subscribe(res => {
      this.removecode = res[0].remove_code_create_code;
      this.application_cat=res[0].remove_code_create_app_cat;
    });
  }

  getcancleorder(){
    this.http.post<any>(this.urlmix + 'getcancelorder', { appcat: this.application_cat }).subscribe(res => {
      this.maxremoveId = res[0].max_id;
      this.maxremoveId=this.maxremoveId+1;
      this.removeno=this.removecode+'/'+this.maxremoveId;
      console.log('max Id is  :'+ this.maxremoveId);
      console.log('Remove no  :'+ this.removeno);
    });
  }

  saveremovedetails(){
    const data = {
      recid: this.reciptId,
      recno: this.inputval,
      canceldate:'2020/01/11',
      canceltime:'17:23:59',
      userid:this.user,
      removecode:this.removeno,
      removeorder:this.maxremoveId,
      appcat:this.application_cat,
      description:this.description
    };
    console.log(data);
    this.http.post<any>(this.urlmix + 'saveremovedetails', data).subscribe(res => {
      const x = res;
      this.description='';
      this.inputval='';
      this.removeno='';
      this.loadrecipt();
      this.mg.message('success', 'Remove success');
    });
  }

  getremovelist(){
    this.http.post<any>(this.urlmix + 'getremovelist', {}).subscribe(res => {
      console.log(res);
      console.log('done');
      this.datasouecelist = new MatTableDataSource(res);
      this.datasouecelist.paginator = this.paginatorlist;
      this.datasouecelist.sort = this.sortlist;
    });
  }
}
