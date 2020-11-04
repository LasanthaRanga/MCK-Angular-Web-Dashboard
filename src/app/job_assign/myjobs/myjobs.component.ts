import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../../service/login/login.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { IJob } from '../sendto/sendto.component';
import * as statics from '../../global';

export interface IJob {
  idJob: number;
  job_number: string;
  job_name: string;
  job_type_id: number;
  job_description: string;
  job_instruction: string;
  job_dip_id: number;
  job_dedline: string;
  job_create_datetime: string;
  job_status: number;
  jobtype_name: string;
  jobstatus: string;
}


@Component({
  selector: 'app-myjobs',
  templateUrl: './myjobs.component.html',
  styleUrls: ['./myjobs.component.css']
})


export class MyjobsComponent implements OnInit {



  urlSendto = statics.ip + 'sendto/';
  urlSubject = statics.ip + 'subjects';
  urlUser = statics.ip + 'userlogin';
  urlAttach = statics.ip + 'attach';
  urlJobs = statics.ip + 'jobs';

  level = 0;
  jobid = 0;
  job_dip_id = 0;

  constructor(private login: LoginService, private router: Router, private route: ActivatedRoute, private http: HttpClient) {
    this.route.params.subscribe(params => {
      if (params.id != null) {
        // this.jobid = params.id;
      }
    });
    this.level = this.login.getUserLevel();
  }

  displayedColumns: string[] = ['jobtype_name', 'job_name', 'subject_name', 'job_create_datetime', 'job_dedline', 'idJob'];
  dataSource = <any>[];



  ngOnInit() {

    this.login.hasPrivilage('/myjobs', 'home');

    let ss = localStorage.getItem('dip');
    console.log(ss);
    let dip = JSON.parse(ss);
    this.job_dip_id = dip[0].idDipartment;

    console.log(this.level);

    if (this.level === 5) {
      this.getAllJobsByDepartment();
      // this.getAllJobsBySubject();
    } else {
      this.getAllJobsBySubject();
    }
  }



  getAllJobsBySubject() {
    const subs: any[] = JSON.parse(localStorage.getItem('subs'));
    let subidArray = '';
    for (let x = 0; x < subs.length; x++) {
      if (x === subs.length - 1) {
        subidArray += subs[x].idSubject;
      } else {
        subidArray += subs[x].idSubject + ',';
      }
    }
    const body = { subids: subidArray };
    console.log(subidArray);
    this.http.post<IJob>(this.urlJobs + "/jobsbysubjects", body).subscribe(data => {
      this.dataSource = data;
    });
  }



  getAllJobsByDepartment() {
    this.http.get<IJob>(this.urlJobs + "/jobs/" + this.job_dip_id).subscribe(data => {
      this.dataSource = data;
    });
  }

  selectJob = false;

  select(element: IJob) {
    this.selectJob = true;
    this.selectedJob = element;
    console.log(this.selectedJob);
    this.jobid = element.idJob;
    this.loadSteps();
  }

  selectedJob = {
    idJob: 0,
    job_number: '',
    job_name: '',
    job_type_id: 0,
    job_description: '',
    job_instruction: '',
    job_dip_id: 0,
    job_dedline: '',
    job_create_datetime: '',
    job_status: 0,
    idJob_assign: 0,
  }

  loadJobData() {
    //  console.log(this.jobid);
    this.http.get<IJob>(this.urlJobs + "/job/" + this.jobid).subscribe(data => {
      this.selectedJob = data[0];
      // console.log(this.selectedJob);
    });
  }

  steps;

  loadSteps() {
    //   console.log(this.jobid);
    this.http.get(this.urlSendto + "/steps/" + this.jobid).subscribe(data => {
      this.steps = data;
    });
  }


  workWithThis() {
    this.router.navigate(['/jobs/' + this.jobid]);
  }







}
