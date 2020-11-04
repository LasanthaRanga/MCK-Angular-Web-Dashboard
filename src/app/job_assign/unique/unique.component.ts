import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import * as statics from '../../global';

@Component({
  selector: 'app-unique',
  templateUrl: './unique.component.html',
  styleUrls: ['./unique.component.css']
})

export class UniqueComponent implements OnInit {
  url = statics.ip + 'unique/';
  inputval = '';

  displayedColumns: string[] = ['idUnique', 'application_name', 'cus_name', 'cus_nic', 'start_at', 'status'];
  dataSource = <any>[];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.loadOllTypes();
  }

  loadOllTypes() {
    this.http.get<any>(this.url + 'all').subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applayFilter(text) {
    this.dataSource.filter = text.trim().toLocaleLowerCase();
  }

  clickOnOne(element) {
    let x = element.idUnique;

    this.router.navigate(['/one/' + x]);


  }

}
