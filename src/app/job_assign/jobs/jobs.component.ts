import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../../service/login/login.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
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
  idJob_assign: number;
  user_full_name: string;
  subject_name: string;
}

export interface Iattach {
  idJob_ac: number;
  job_comment: string;
  job_attach: string;
  assign_id: number;
  file: string;
}


@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  urlSendto = statics.ip + 'sendto/';
  urlSubject = statics.ip + 'subjects';
  urlUser = statics.ip + 'userlogin';
  urlAttach = statics.ip + 'attach';
  urlJobs = statics.ip + 'jobs';


  level = 0;
  jobid = 0;
  constructor(private login: LoginService, private router: Router, private route: ActivatedRoute, private http: HttpClient, private sanitizer: DomSanitizer) {
    this.route.params.subscribe(params => {
      if (params.id != null) {
        this.jobid = params.id;
      }
    });
    this.level = this.login.getUserLevel();
  }

  ngOnInit() {
    //this.login.hasPrivilage('/jobs', 'home');
    // console.log(this.level);
    this.loadJobData();
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
    user_full_name: '',
    subject_name: ''
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
      this.loadAttach();
    });
  }



  attach = [];
  loadAttach() {
    this.steps.forEach(element => {
      this.http.get(this.urlAttach + '/' + element.idJob_assign).subscribe(data => {
        const array = JSON.parse(JSON.stringify(data));
        for (let i = 0; i < array.length; i++) {
          this.attach.push({
            idJob_ac: array[i].idJob_ac,
            job_comment: array[i].job_comment,
            job_attach: array[i].job_attach,
            assign_id: array[i].assign_id,
            img: null,
            file: true
          });
        }
      });
    });
    console.log(this.attach);
  }



  clickOnload(att) {

    console.log("click");
    console.log(att.file = false);
    this.http.get(this.urlAttach + "/img/" + att.job_attach, {
      responseType: 'blob'
    }).subscribe(d => {
      att.img = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(d));
      console.log(att.img);
    });
  }


  clickOnSubmit() {
    console.log("stepsss  ");
    console.log(this.steps)
    console.log("steps length ");
    console.log(this.steps.length);


    const subs: any[] = JSON.parse(localStorage.getItem('subs'));
    let subidArray = '';
    for (let x = 0; x < subs.length; x++) {
      if (x === subs.length - 1) {
        subidArray += subs[x].idSubject;
      } else {
        subidArray += subs[x].idSubject + ',';
      }
    }

    console.log("===========");
    console.log(subs);
    console.log(subidArray);
    const body = { subids: subidArray };

    this.http.get(this.urlSendto + 'assignid/' + subidArray + '/' + this.jobid).subscribe(data => {
      let id = data[0].idJob_assign;
      this.router.navigate(['/attach/' + id]);
    });


    let st = this.steps[this.steps.length - 1];
    console.log(st.idJob_assign);

  }

  getAllJobsBySubject() {


  }






  test() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });
    Toast.fire({
      icon: 'error',
      title: 'Signed in successfully'
    });
  }
}
