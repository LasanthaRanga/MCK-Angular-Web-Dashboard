import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/service/login/login.service';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatDialog } from '@angular/material';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import * as statics from '../../global';
import * as allert from '../../allert';

@Component({
  selector: 'app-privilages',
  templateUrl: './privilages.component.html',
  styleUrls: ['./privilages.component.css']
})
export class PrivilagesComponent implements OnInit {

  url = statics.ip + 'privilage';
  mg: allert.Globle;

  constructor(private httpClient: HttpClient, private login: LoginService, private matDialog: MatDialog) {
    this.mg = new allert.Globle();
  }

  displayedColumns: string[] = ['idApproval_cat', 'approval_name'];
  dataSource = <any>[];

  displayedColumnsPrivilage: string[] = ['image', 'caption', 'id'];
  dataSourcePrivilage = <any>[];

  displayedColumnsAdded: string[] = ['image', 'caption', 'id'];
  dataSourcePrivilageAdded = <any>[];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  ngOnInit() {
    this.loadApprovalcat();
    this.loadAllPrivilages();
  }

  loadApprovalcat() {
    this.httpClient.get<any>(this.url + '/aprovalcat').subscribe(res => {
      console.log(this.dataSource);
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  loadAllPrivilages() {
    this.httpClient.get<any>(this.url + '/privilages').subscribe(res => {
      console.log(this.dataSource);
      this.dataSourcePrivilage = new MatTableDataSource(res);
      this.dataSourcePrivilage.paginator = this.paginator;
      this.dataSourcePrivilage.sort = this.sort;
    });
  }

  loadPrivilagesByApprovalCat(id: number) {
    this.httpClient.get<any>(this.url + '/apcathas/' + id).subscribe(res => {
      console.log(this.dataSource);
      this.dataSourcePrivilageAdded = new MatTableDataSource(res);
      this.dataSourcePrivilageAdded.paginator = this.paginator;
      this.dataSourcePrivilageAdded.sort = this.sort;
    });
  }

  userName = '';

  searchUser(text: string) {
    this.dataSource.filter = text.trim().toLocaleLowerCase();
  }


  idApproval_cat = 0;
  approval_name = '';

  selectedRow(row) {
    this.idApproval_cat = row.idApproval_cat;
    this.approval_name = row.approval_name;
    console.log(this.approval_name);
    this.loadPrivilagesByApprovalCat(this.idApproval_cat);
  }

  addPrivilage(text: string, text2: string) {
    if (this.idApproval_cat > 0) {
      console.log(text, text2);
      let dialogRef = this.matDialog.open(DialogComponent, { data: { title: 'Add Privilage', message: 'Are you sure to Add  \n' + text2 } });
      dialogRef.afterClosed().subscribe(result => {
        if (result.toString() === 'true') {
          // console.log('Delete');
          //  this.deleteUserFromSubject("asd");
          this.insertPrivilages(text, this.idApproval_cat);
        } else {
          //  console.log('Dont Delete');
        }
      });
    } else {
      this.mg.message('warning', 'Select User Category First');
    }
  }


  insertPrivilages(pid, catid) {
    this.httpClient.post(this.url + '/add', { 'idcat': catid, 'idprv': pid }).subscribe(res => {
      let response = JSON.parse(JSON.stringify(res));
      console.log(response.mg);
      if (response.mg == 'exsist') {
        this.mg.message('info', 'exsist');
      } else {
        this.loadPrivilagesByApprovalCat(catid);
        this.mg.message('success', 'done');
      }
    });

  }


  removePrivilage(text: string, text2: string) {
    if (this.idApproval_cat > 0) {
      console.log(text, text2);

      let dialogRef = this.matDialog.open(DialogComponent, { data: { title: 'Remove Privilage', message: 'Are you sure to remove this  \n' + text2 } });

      dialogRef.afterClosed().subscribe(result => {
        if (result.toString() === 'true') {
          // console.log('Delete');
          //  this.deleteUserFromSubject("asd");
          this.RemovePrivilages(text, this.idApproval_cat);
        } else {
          //  console.log('Dont Delete');
        }
      });
    } else {
      this.mg.message('warning', 'Select User Category First');
    }
  }

  RemovePrivilages(pid, catid) {
    this.httpClient.post(this.url + '/remove', { 'idcat': catid, 'idprv': pid }).subscribe(res => {
      let response = JSON.parse(JSON.stringify(res));
      console.log(response.mg);
      if (response.mg == 'exsist') {
        this.mg.message('info', 'exsist');
      } else {
        this.loadPrivilagesByApprovalCat(catid);
        this.mg.message('success', 'done');
      }
    });

  }


}
