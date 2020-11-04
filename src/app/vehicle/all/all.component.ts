import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as statics from '../../global';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {
  urlVehicle = statics.ip + 'vehicle/';
  inputval = '';

  displayedColumns: string[] = ['regno', 'V_type_name', 'vbf_modle', 'V_make_company', 'vbf_status'];
  dataSource = <any>[];


  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;


  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    this.loadAllVehicle();
  }

  loadAllVehicle() {
    this.http.post<any>(this.urlVehicle + 'getAllVehicles', {}).subscribe(res => {
      console.log(res);
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  applayFilter(text) {
    this.dataSource.filter = text.trim().toLocaleLowerCase();
  }

  clickOnOne(element) {
    let x = element.idV_Basicinfo;
    this.router.navigate(['v/fullinfo/' + x]);
  }

}
