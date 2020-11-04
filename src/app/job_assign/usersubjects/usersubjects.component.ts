import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/service/login/login.service';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatDialog } from '@angular/material';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import * as statics from '../../global';

export interface IUser {
  idUser: number;
  user_full_name: string;
  user_nic: string;
}

export interface IsubUser {
  idUser_has_subject: number;
  user_id: number;
  subject_id: number;
  user_full_name: string;
  user_nic: string;
  subject_name: string;
  subject_code: string;
  idDipartment: number;
  dip_name: string;
}



@Component({
  selector: 'app-usersubjects',
  templateUrl: './usersubjects.component.html',
  styleUrls: ['./usersubjects.component.css']
})
export class UsersubjectsComponent implements OnInit {

  urlDipartment = statics.ip + 'department';
  urlUser = statics.ip + 'userlogin';
  urlSubject = statics.ip + 'subjects';

  displayedColumns: string[] = ['idUser', 'user_full_name', 'user_nic'];
  dataSource = <any>[];

  suDisplayedColumns: string[] = ['dip_name', 'subject_name', 'subject_code', 'user_full_name', 'user_nic', 'idUser_has_subject'];
  suDataSource = <any>[];


  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private _httpClient: HttpClient, private matDialog: MatDialog, private login: LoginService) { }

  ngOnInit() {
    this.login.hasPrivilage('/usersubject', 'home');
    this.loadUsers();
    this.loadDepartment();

    this.loadUserSubjects();

  }

  loadUsers() {
    this._httpClient.get<IUser[]>(this.urlUser).subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  userName = '';
  searchUser(text: string) {
    this.dataSource.filter = text.trim().toLocaleLowerCase();
  }


  uid = 0;
  uname = '';
  nic = '';
  selectedUser(row) {
    this.uid = row.idUser;
    this.uname = row.user_full_name;
    this.nic = row.user_nic;
    console.log(this.uname);
  }
  dipid = 0;
  departmentArray = <any>[];
  loadDepartment() {
    this._httpClient.get(this.urlDipartment).subscribe(res => {
      this.departmentArray = res;
    });
  }

  subid = 0;
  subjectArray = <any>[];
  loadSubject(text: string) {
    console.log(text);
    if (text != null && text.length > 0) {
      this._httpClient.get(this.urlSubject + "/" + text).subscribe(res => {
        this.subjectArray = res;
      });
    }
  }

  userAsseignToSubject() {
    let body = { uid: this.uid, subid: this.subid }
    if (body.uid > 0 && body.subid > 0) {
      this._httpClient.post(this.urlSubject + "/assignUsers", body).subscribe(data => {
        console.log(data);
        this.uid = 0;
        this.uname = '';
        this.nic = '';
        this.subid = 0;
        this.dipid = 0;
        this.loadDepartment();
        this.loadUserSubjects();
      });
    }
  }

  loadUserSubjects() {
    this._httpClient.get<IsubUser[]>(this.urlSubject + "/all").subscribe(res => {
      this.suDataSource = new MatTableDataSource(res);
      this.suDataSource.paginator = this.paginator;
      this.suDataSource.sort = this.sort;
    });
  }

  filterAllTable(text: string) {
    this.suDataSource.filter = text.trim().toLocaleLowerCase();
  }

  remove(text: IsubUser) {
    console.log(text);
    let dialogRef = this.matDialog.open(DialogComponent, { data: { title: 'Remove From Subject', message: 'Are you sure to remove' } });
    dialogRef.afterClosed().subscribe(result => {
      if (result.toString() === 'true') {
        // console.log('Delete');
        this.deleteUserFromSubject(text.idUser_has_subject);
      } else {
        //  console.log('Dont Delete');
      }
    });
  }

  deleteUserFromSubject(id: number) {
    this._httpClient.delete(this.urlSubject + '/' + id).subscribe(data => {
      this.loadUserSubjects();
    });
  }


}
