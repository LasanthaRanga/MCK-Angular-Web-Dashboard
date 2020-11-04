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
  selector: 'app-alljobs',
  templateUrl: './alljobs.component.html',
  styleUrls: ['./alljobs.component.css']
})
export class AlljobsComponent implements OnInit {

  urlSendto = statics.ip + 'sendto/';
  urlSubject = statics.ip + 'subjects';
  urlUser = statics.ip + 'userlogin';
  urlAttach = statics.ip + 'attach';
  urlJobs = statics.ip + 'jobs';

  level = 0;
  jobid = 0;
  job_dip_id = 0;

  constructor(private login: LoginService, private router: Router, private route: ActivatedRoute, private http: HttpClient) {

  }

  displayedColumns: string[] = ['jobtype_name', 'job_name', 'subject_name', 'job_create_datetime', 'job_dedline', 'idJob'];
  dataSource = <any>[];


  ngOnInit() {



    this.getAllJobs();
    // this.getAllJobsBySubject();

  }




  getAllJobs() {
    this.http.get<IJob>(this.urlJobs + '/alljobs').subscribe(data => {
      this.dataSource = data;
    });
  }

  selectJob = false;



  select(element: IJob) {
    this.selectJob = true;
    this.selectedJob = element;
    console.log(this.selectedJob);
    this.jobid = element.idJob;

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



  steps;

  workWithThis() {
    this.router.navigate(['/jobs/' + this.jobid]);
  }



}
