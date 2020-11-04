import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/service/login/login.service';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import * as statics from '../../global';


export interface ISubjects {
  dip_name: string;
  subject_name: string;
  subject_code: string;
  idSubject: number;
  idDipartment: number;
}




@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  url = statics.ip + 'department';
  urlsubject = statics.ip + 'subjects';
  dipid: number;
  subjectName = '';
  subjectCode = '';
  departmentArray = <any>[];

  constructor(private _httpClient: HttpClient, private login: LoginService) { }


  displayedColumns: string[] = ['idSubject', 'subject_name', 'subject_code', 'dip_name'];
  dataSource = <any>[];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;




  ngOnInit() {
    this.login.hasPrivilage('/subjects', 'home');
    this.loadDepartment();
    this.loadSubjects();
  }

  applayFilter(text: string) {

  }

  onAddSubject() {
    var body = { name: this.subjectName, code: this.subjectCode, dipid: this.dipid }
    if (body.name != null && body.name.length > 0 && this.dipid != null && this.dipid > 0) {
      this._httpClient.post(this.urlsubject, body).subscribe(res => {
        //  console.log(res);
        this.loadSubjects();
      });
    } else {
      console.log("Empty Fields");
    }
  }

  loadDepartment() {
    this._httpClient.get(this.url).subscribe(res => {
      this.departmentArray = res;
    });
  }

  loadSubjects() {
    this._httpClient.get<ISubjects[]>(this.urlsubject).subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

}
