import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import * as statics from '../../global';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import * as allert from '../../allert';



@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {
  urlVehicle = statics.ip + 'vehicle/';
  mg: allert.Globle;
  basicID;
  number;
  active = true;

  idTool;
  toolName;
  qty;
  description;
  status;
  deactiveComment;


  anableDeactive = false;

  inputval = '';
  displayedColumns: string[] = ['tool_name', 'qty', 'idTool'];
  dataSource = <any>[];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private http: HttpClient,
    private router: Router,
    private datePipe: DatePipe,
    private ar: ActivatedRoute

  ) {
    this.mg = new allert.Globle();
  }

  ngOnInit() {
    this.ar.params.subscribe(params => {
      this.basicID = params.id;
      if (this.basicID && this.basicID > 0) {
        this.getNumber();
        this.loadTools(1);
      } else { }
    });
  }

  getNumber() {
    this.http.post(this.urlVehicle + 'getNumber', { id: this.basicID }).subscribe(res => {
     // console.log(res);
      this.number = res[0].V_provincecode + '  ' + res[0].vbf_regno1;
    });
  }

  loadTools(st) {
    this.http.post<any>(this.urlVehicle + 'getTools', { id: this.basicID, status: st }).subscribe(res => {
      console.log(res);
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applayFilter(text) {
    this.dataSource.filter = text.trim().toLocaleLowerCase();
  }

  save() {
    const tool = {
      name: this.toolName,
      qty: this.qty,
      des: this.description,
      id: this.basicID
    };

    if (tool.name && tool.name.length > 2 && tool.qty > 0) {
      this.http.post(this.urlVehicle + 'saveTools', tool).subscribe(res => {
        console.log(res);
        this.loadTools(1);
        this.mg.message('success', 'Tool Added');
      });
    } else {
      this.mg.message('warning', 'Enter Valid Data');
    }


  }

  clickOnDelet(item) {
    this.idTool = item.idTool;
    this.toolName = item.tool_name;
    this.qty = item.qty;
    this.description = item.description;
    this.status = item.status;
    console.log(item);
  }

  anable() {
    console.log(this.deactiveComment);
    if (this.deactiveComment && this.deactiveComment.length > 3) {
      this.anableDeactive = true;
    } else {
      this.anableDeactive = false;
    }
  }

  deactive() {
    const comment = {
      comment: this.deactiveComment,
      idTool: this.idTool
    };
    this.http.post(this.urlVehicle + 'deactiveTools', comment).subscribe(res => {
      this.mg.message('success', 'Tool Deactivated');
      console.log(res);
      this.loadTools(1);
      this.clearItem();
    });
  }

  clearItem() {
    this.idTool = null;
    this.toolName = null;
    this.qty = null;
    this.description = null;
    this.deactiveComment = null;
    this.status = 1;
  }

  filterDeactive() {
    console.log(this.active);
    if (this.active) {
      this.loadTools(1);
    } else {
      this.loadTools(2);
    }

  }



}
