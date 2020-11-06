import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import * as statics from '../../global';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import * as allert from '../../allert';

@Component({
  selector: 'app-fullinfo',
  templateUrl: './fullinfo.component.html',
  styleUrls: ['./fullinfo.component.css']
})
export class FullinfoComponent implements OnInit {
  urlVehicle = statics.ip + 'vehicle/';
  basicID;
  data;
  number;

  constructor(private ar: ActivatedRoute, private router: Router, private http: HttpClient) {
    this.ar.params.subscribe(params => this.basicID = params.id);
    if (this.basicID && this.basicID > 0) {
      this.getNumber();
    }
  }

  ngOnInit() {
  }

  update() {
    this.router.navigate(['v/basic/' + this.basicID]);

  }

  getData() {
    this.http.post<any>(this.urlVehicle + 'getAllVehicleById', { id: this.basicID }).subscribe(res => {
      this.data = res[0];
      //  console.log(this.data);
    });

  }

  getNumber() {
    this.http.post(this.urlVehicle + 'getNumber', { id: this.basicID }).subscribe(res => {
      this.number = res[0].V_provincecode + '  ' + res[0].vbf_regno1;
    });
  }





  goToTools() {
    this.router.navigate(['v/toosl', this.basicID]);
  }

  goToFuelC() {
    this.router.navigate(['v/fuelc', this.basicID]);
  }

  goToLicences() {
    this.router.navigate(['v/license', this.basicID]);
  }

  goToRepairs() {
    this.router.navigate(['v/repairs', this.basicID]);
  }

  goToTyres() {
    this.router.navigate(['v/tyres', this.basicID]);
  }

  goToService() {
    this.router.navigate(['v/service', this.basicID]);
  }

  goToChange() {
    this.router.navigate(['v/driver', this.basicID]);
  }

  goToUpload() {
    this.router.navigate(['v/upload', this.basicID]);
  }


}
