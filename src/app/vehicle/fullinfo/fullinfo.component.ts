import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import * as statics from '../../global';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import * as allert from '../../allert';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-fullinfo',
  templateUrl: './fullinfo.component.html',
  styleUrls: ['./fullinfo.component.css']
})
export class FullinfoComponent implements OnInit {

  private tools = require('../../../assets/images/icons/settings.png');
  private fuel = require('../../../assets/images/icons/fuelc.png');
  private licens = require('../../../assets/images/icons/driving-license.png');
  private repair = require('../../../assets/images/icons/car-repair.png');
  private tire = require('../../../assets/images/icons/tire.png');
  private service = require('../../../assets/images/icons/car-wash.png');
  private driver = require('../../../assets/images/icons/driver.png');
  private photo = require('../../../assets/images/icons/photo.png');
  private upda = require('../../../assets/images/icons/updated.png');



  urlVehicle = statics.ip + 'vehicle/';
  basicID;
  data;
  number;
  attach = [];
  constructor(private ar: ActivatedRoute, private router: Router, private http: HttpClient, private sanitizer: DomSanitizer) {
    this.ar.params.subscribe(params => this.basicID = params.id);
    if (this.basicID && this.basicID > 0) {
      this.getNumber();
      this.loadAttach();
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

  loadAttach() {
    this.attach = [];
    this.http.get(this.urlVehicle + 'image/' + this.basicID).subscribe(data => {
      const array = JSON.parse(JSON.stringify(data));
      for (let i = 0; i < array.length; i++) {
        this.http.get(this.urlVehicle + '/img/' + array[i].V_images_path, {
          responseType: 'blob'
        }).subscribe(d => {
          const imgg = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(d));
          this.attach.push({
            idJob_ac: array[i].idJob_ac,
            job_comment: array[i].job_comment,
            job_attach: array[i].job_attach,
            assign_id: array[i].assign_id,
            img: imgg,
            file: true
          });
        });
      }
    });

    console.log(this.attach);
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
