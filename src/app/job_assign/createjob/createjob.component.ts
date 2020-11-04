import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/service/login/login.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatDialog } from '@angular/material';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as statics from '../../global';
import * as allert from '../../allert';

export interface IJobType {
  idWeb_jobtype: number;
  jobtype_name: string;
}

@Component({
  selector: 'app-createjob',
  templateUrl: './createjob.component.html',
  styleUrls: ['./createjob.component.css']
})


export class CreatejobComponent implements OnInit {

  urlDipartment = statics.ip + 'department';
  urlUser = statics.ip + 'userlogin';
  urlSubject = statics.ip + 'subjects';
  urlJobTypes = statics.ip + 'jobtypes';
  urlJobs = statics.ip + 'jobs';

  dedline = '';
  mg: allert.Globle;
  constructor(private http: HttpClient, private router: Router, private login: LoginService) {
    this.login.hasPrivilage("/createjob", "home");
    this.mg = new allert.Globle();
  }

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;


  favoriteSeason: string;
  seasons: string[] = ['Mail', 'Complain', 'Job'];


  ngOnInit() {

    this.loadJobTypes();
    this.loadJobNumber();
  }



  jobTypeArray = <any>[];
  loadJobTypes() {
    this.http.get<IJobType[]>(this.urlJobTypes).subscribe(data => {
      this.jobTypeArray = data;
    });
  }


  isCustomer = false;

  selectType(season) {

    console.log(season);
    if (season == 'Mail') {
      this.job_cat = 1;
      this.isCustomer = true;
    }
    if (season == 'Complain') {
      this.job_cat = 2;
      this.isCustomer = true;
    }
    if (season == 'Job') {
      this.job_cat = 3;
      this.isCustomer = false;
    }
    this.http.get<IJobType[]>(this.urlJobTypes + '/' + this.job_cat).subscribe(data => {
      this.jobTypeArray = data;
    });


  }

  jobNumber = 0;
  loadJobNumber() {
    this.http.get(this.urlJobs + '/number').subscribe(data => {
      let res = JSON.parse(JSON.stringify(data));
      this.jobNumber = res.number;
      console.log(res + '   ==  ' + this.jobNumber);
    });
  }

  // searchJobType(text: string) {
  // this.jobTypeArray.filter = text.trim().toLocaleLowerCase();
  //   this.jobTypeArray.filter(option => option.toLowerCase().startsWith(text));
  // }



  getSelectedDate(txt: string) {
    console.log(txt);
  }

  formatDate(date) {
    return this.job_dedline = formatDate(date, 'yyyy-MM-dd', 'en-US', '+0530');
  }

  cus_name = '';
  cus_mobile = '';
  cus_email = '';


  job_name = '';
  job_type_id = 0;
  job_description = '';
  job_instruction = '';
  job_dip_id = 0;
  job_dedline = '';
  job_create_datetime = '';
  job_status = 0;
  user_id = 0;
  job_cat = 0;
  job_cat_name = ''


  createNewJob() {
    try {
      this.job_create_datetime = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en-US', '+0530');
      let ss = localStorage.getItem('dip');
      console.log(ss);
      let dip = JSON.parse(ss);
      this.job_dip_id = dip[0].idDipartment;
      this.job_status = 1;
      let arrr = JSON.parse(sessionStorage.getItem('loged'));
      this.user_id = arrr[0].idUser;


      if (this.favoriteSeason == 'Mail') {
        this.job_cat = 1;
      }
      if (this.favoriteSeason == 'Complain') {
        this.job_cat = 2;
      }
      if (this.favoriteSeason == 'Job') {
        this.job_cat = 3;
      }

      if (this.job_cat > 0 && this.job_type_id > 0) {

        const body = {
          job_name: this.job_name,
          job_type_id: this.job_type_id,
          job_description: this.job_description,
          job_instruction: this.job_instruction,
          job_dip_id: this.job_dip_id,
          job_dedline: this.job_dedline,
          job_create_datetime: this.job_create_datetime,
          job_status: this.job_status,
          user_id: this.user_id,
          job_cat: this.job_cat,
          job_cat_name: this.favoriteSeason,
          cus_name: this.cus_name,
          cus_email: this.cus_email,
          cus_mobile: this.cus_mobile
        };

        this.http.post(this.urlJobs, body).subscribe(data => {
          let assign = JSON.parse(JSON.stringify(data));
          let assign_id = assign[0].assignid;
          if (assign_id > 0) {
            this.job_name = '';
            this.job_type_id = 0;
            this.job_description = '';
            this.job_instruction = '';
            this.job_dip_id = 0;
            this.job_dedline = '';
            this.job_create_datetime = '';
            this.job_status = 0;
            this.user_id = 0;
            this.cus_name = '';
            this.cus_email = '';
            this.cus_mobile = '';
          }

          this.router.navigate(['/attach/' + assign_id]);
        });

      } else {
        this.mg.message('warning', 'Please Select Type');
      }


    } catch (e) {
      console.log(e);
    }
  }
}
