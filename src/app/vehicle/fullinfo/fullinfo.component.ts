import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as statics from '../../global';
@Component({
  selector: 'app-fullinfo',
  templateUrl: './fullinfo.component.html',
  styleUrls: ['./fullinfo.component.css']
})
export class FullinfoComponent implements OnInit {
  urlVehicle = statics.ip + 'vehicle/';
  basicID;
  data;

  constructor(private ar: ActivatedRoute, private router: Router, private http: HttpClient) {
    this.ar.params.subscribe(params => this.basicID = params.id);
    if (this.basicID && this.basicID > 0) {
    //  this.getData();
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


}
