import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import * as statics from '../../global';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import * as allert from '../../allert';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';


export interface User {
  id: number;
  name: string;
}

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  urlVehicle = statics.ip + 'vehicle/';
  mg: allert.Globle;
  basicID;
  number;
  active = true;
  userId;
  anableDeactive = false;



  day;
  deactiveComment;
  idDriver;
  status;
  inputval = '';

  myControl = new FormControl();
  filteredOptions: Observable<User[]>;
  selectedUser;
  selectedUserName;
  options: User[] = [];
  dv;

  displayedColumns: string[] = ['driverName', 'from', 'to', 'idDriver'];
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
        this.getDrivers();
        this.loadDrivers(1);
      } else { }
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filter(name) : this.options.slice())
    );



  }

  private _filter(name: string): User[] {
    console.log(name);
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  getDrivers() {
    this.http.post(this.urlVehicle + 'getDrivers', {}).subscribe(res => {
      this.dv = res;
      const ar = [];
      this.dv.forEach(el => {
        ar.push({ id: el.id, name: el.name });
      });
      this.options = ar;

    });
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  selectedUserChange(value) {
    console.log('change');
    console.log(value);

    this.selectedUser = value.id;
    this.selectedUserName = value.name;

  }


  getNumber() {
    this.http.post(this.urlVehicle + 'getNumber', { id: this.basicID }).subscribe(res => {
      this.number = res[0].V_provincecode + '  ' + res[0].vbf_regno1;
    });
  }

  loadDrivers(st) {
    console.log("load");
    this.http.post<any>(this.urlVehicle + 'getVehicleDriver', { id: this.basicID, status: st }).subscribe(res => {
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
      this.loadDrivers(1);
    } else {
      this.loadDrivers(2);
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
    const li = {
      basicID: this.basicID,
      userID: this.selectedUser,
      driverName: this.selectedUserName,
      day: new DatePipe('en').transform(this.day, 'yyyy-MM-dd')
    };

    if (this.userId > 0) {
      this.http.post(this.urlVehicle + 'saveDriver', li).subscribe(res => {
        this.loadDrivers(1);
        this.mg.message('success', 'Driver');
        this.clearItem();
      });
    } else {
      this.mg.message('warning', 'Enter Valid Data');
    }
  }

  select(item) {
    console.log(item);
    this.idDriver = item.idDriver;
    this.selectedUserName = item.driverName;
    this.displayFn({ id: item.userId, name: item.driverName });
    this.status = item.status;
    this.day = new DatePipe('en').transform(item.from, 'yyyy-MM-dd');
  }

  clearItem() {
    this.idDriver = null;
    this.displayFn = null;
    this.status = null;
    this.day = null;
  }

  deactive() {
    const comment = {
      comment: this.deactiveComment,
      idDriver: this.idDriver,
      day: new DatePipe('en').transform(new Date(), 'yyyy-MM-dd')
    };
    this.http.post(this.urlVehicle + 'deactiveDriver', comment).subscribe(res => {
      this.mg.message('success', 'Deactivated');
      console.log(res);
      this.loadDrivers(1);
      this.clearItem();
    });
  }

}
