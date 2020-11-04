import { Component, OnInit, ViewChild } from '@angular/core';
import { JobtypesService } from 'src/app/service/jobtypes.service';
import { IJobType } from 'src/app/pojo/jobTyp';
import { LoginService } from 'src/app/service/login/login.service';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import * as statics from '../../global';
import * as allert from '../../allert';


export interface PeriodicElement {
  idWeb_jobtype: number;
  jobtype_name: string;
}


@Component({
  selector: 'app-jobtypes',
  templateUrl: './jobtypes.component.html',
  styleUrls: ['./jobtypes.component.css']
})
export class JobtypesComponent implements OnInit {

  mg: allert.Globle;


  displayedColumns: string[] = ['idWeb_jobtype', 'jobtype_name'];
  dataSource = <any>[];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  jobType: IJobType;
  typeName = '';

  url = statics.ip + "jobtypes";

  favoriteSeason: string;
  seasons: string[] = ['Mail', 'Complain', 'Job'];

  showSppiner = false;

  constructor(private _jobtypesService: JobtypesService, private login: LoginService, private http: HttpClient) {
    this.mg = new allert.Globle();
  }
  ngOnInit() {

    this.login.hasPrivilage('/jobtypes', 'home');
    this.loadOllTypes();

  }

  job_cat = 0;

  onAddPost() {

    if (this.favoriteSeason == 'Mail') {
      this.job_cat = 1;
    }
    if (this.favoriteSeason == 'Complain') {
      this.job_cat = 2;
    }
    if (this.favoriteSeason == 'Job') {
      this.job_cat = 3;
    }

    if (this.job_cat > 0) {
      if (this.typeName.length > 0) {
        this.showSppiner = true;
        let job = { type: this.typeName, cat: this.job_cat }
        this.http.post(this.url, job).toPromise().then(data => {
          console.log(data);
          this.loadOllTypes();
          this.typeName = '';
        });
        this.showSppiner = false;
      } else {
        this.mg.message('warning', 'Invalid Type');
      }

    } else {
      this.mg.message('warning', 'Please select a type');
    }




  }

  selectJobType(season) {
    if (season == 'Mail') {
      this.job_cat = 1;
    }
    if (season == 'Complain') {
      this.job_cat = 2;
    }
    if (season == 'Job') {
      this.job_cat = 3;
    }

    this.http.get<PeriodicElement[]>(this.url + '/' + this.job_cat).subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }



  loadOllTypes() {
    this.http.get<PeriodicElement[]>(this.url).subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applayFilter(text: string) {
    this.dataSource.filter = text.trim().toLocaleLowerCase();
  }



}
