import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { LoginService } from 'src/app/service/login/login.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { formatDate } from '@angular/common';
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
  jobtype_name: string;
  idWeb_jobtype: number;
  step: number;
}

export interface IUser {
  user_full_name: string;
  user_nic: string;
  idUser: number;
  Dipartment_idDipartment: number;
  user_id: number;
  subject_name: string;
  idSubject: number;
  department_id: number;
}

export interface Ipic {
  id: number;
  path: string;
  comment: string;
}


@Component({
  selector: 'app-sendto',
  templateUrl: './sendto.component.html',
  styleUrls: ['./sendto.component.css']
})
export class SendtoComponent implements OnInit {

  assignid = '';
  urlSendto = statics.ip + 'sendto/assign/';
  urlSubject = statics.ip + 'subjects';
  urlUser = statics.ip + 'userlogin';
  urlAttach = statics.ip + 'attach';
  urlJobs = statics.ip + 'jobs';

  job: IJob = {
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
    jobtype_name: '',
    idWeb_jobtype: 0,
    step: 0
  };

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;


  level = 0;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private login: LoginService,
    private sanitizer: DomSanitizer,
    private matDialog: MatDialog,
    private router: Router
  ) {
    this.route.params.subscribe(params => this.assignid = params.id);
    console.log(this.assignid);
    this.http.get<IJob>(this.urlSendto + this.assignid).subscribe(data => {
      this.job = data[0];
      console.log(this.job);
    });
    this.level = this.login.getUserLevel();
  }

  displayedColumns: string[] = ['user_full_name', 'user_nic', 'subject_name'];
  dataSource = <any>[];

  ngOnInit() {
    //  this.login.hasPrivilage("/sendto", "home");
    this.loadSubject();
    this.loadUsers();
    this.getAttachList();
  }

  dipid = 0;

  subid = 0;
  subjectArray = <any>[];

  loadSubject() {

    let dip = JSON.parse(localStorage.getItem('dip'));
    let job_dip_id = dip[0].idDipartment;
    this.dipid = job_dip_id;


    if (this.level == 6 || this.level == 5) {
      this.http.get(this.urlSubject).subscribe(res => {
        this.subjectArray = res;
      });

    } else {
      this.http.get(this.urlSubject + '/' + job_dip_id).subscribe(res => {
        this.subjectArray = res;
      });

    }



  }

  imageList = <any>[];
  getAttachList() {
    this.http.get(this.urlAttach + "/" + this.assignid).subscribe(res => {
      this.imageList = res;
      console.log(this.imageList);
    });
  }


  loadUsers() {

    if (this.level == 6) {
      this.http.get<IUser[]>(this.urlUser + '/users/').subscribe(res => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    } else {
      this.http.get<IUser[]>(this.urlUser + '/' + this.dipid).subscribe(res => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }





  }

  searchUser(text: string) {
    this.dataSource.filter = text.trim().toLocaleLowerCase();
  }

  loadImage = false;
  images = <any>[];
  download() {
    this.loadImage = true;
    for (let img of this.imageList) {
      this.getImage(img.job_attach);
    }
  }

  getImage(path: string) {
    this.http.get(this.urlAttach + "/img/" + path, {
      responseType: 'blob'
    }).subscribe(data => {
      let objectURL = URL.createObjectURL(data);
      let img = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      this.images.push(img);
    });
  }


  selectedSubject = '';

  loadUserBySubject(text: number) {
    if (text == 0) {
      this.http.get<IUser[]>(this.urlUser + "/" + this.dipid).subscribe(res => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    } else {
      this.http.get<IUser[]>(this.urlUser + "/" + this.dipid + "/" + text).subscribe(res => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });

      this.http.get(this.urlSubject + "/byid/" + text).subscribe(res => {
        this.selectedSubject = res[0].subject_name;
        console.log(this.selectedSubject);
      });
    }
  }





  sendTouser(element: IUser) {
    // console.log(element);
    let time = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en-US', '+0530');
    const dialogRef = this.matDialog.open(DialogComponent,
      { data: { title: 'Are you sure to send', message: element.user_full_name + " \n " + element.user_nic } }
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result.toString() === 'true') {
        console.log('Assign');
        let body = {
          job_id: this.job.idJob,
          user_id: element.user_id,
          subject_id: element.idSubject,
          date_time: time,
          status_id: 2,
          step: this.job.step + 1,
          step_name: 'Assign To User'
        };
        this.http.post(this.urlJobs + "/assign", body).subscribe(res => {
          console.log(res);
          this.router.navigate(['/jobs/' + body.job_id]);
        });
        //  this.deleteUserFromSubject(text.idUser_has_subject);
      } else {
        console.log('Dont Delete');
      }
    });
  }


  sendDipHead() {
    // console.log(element);
    let time = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en-US', '+0530');
    const dialogRef = this.matDialog.open(DialogComponent,
      { data: { title: 'Are you sure to send Job created person', message: 'I am done my work please check it' } }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result.toString() === 'true') {

        let body = {
          job_id: this.job.idJob,
          user_id: 0,
          subject_id: 0,
          date_time: time,
          status_id: 3,
          step: this.job.step + 1,
          step_name: 'Job Done By Subject'
        };

        this.http.get(this.urlJobs + '/jobCreated/' + this.job.idJob).subscribe(res => {
          body.user_id = res[0].user_id;
          console.log(body);
          this.http.post(this.urlJobs + "/assign", body).subscribe(ress => {
            console.log(ress);
            this.router.navigate(['/jobs/' + body.job_id]);
          });
        });
      } else {
        console.log('Dont SEND');
      }
    });
  }




  sendToSubject() {

    console.log("send to subject");
    console.log(this.subid);

    if (this.subid > 0) {

      let time = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en-US', '+0530');
      const dialogRef = this.matDialog.open(DialogComponent,
        { data: { title: 'Are you sure to send this subject', message: this.selectedSubject } }
      );
      dialogRef.afterClosed().subscribe(result => {
        if (result.toString() === 'true') {
          console.log('Assign');
          let body = {
            job_id: this.job.idJob,
            user_id: null,
            subject_id: this.subid,
            date_time: time,
            status_id: 2,
            step: this.job.step + 1,
            step_name: 'Assign To Subject'
          };
          this.http.post(this.urlJobs + "/assign", body).subscribe(res => {
            console.log(res);
            this.router.navigate(['/jobs/' + body.job_id]);
          });
          //  this.deleteUserFromSubject(text.idUser_has_subject);
        } else {
          console.log('Dont Delete');
        }
      });

    } else {


    }

  }

}
