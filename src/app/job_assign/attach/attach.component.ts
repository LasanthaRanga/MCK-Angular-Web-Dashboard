import { Component, OnInit, Sanitizer } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login/login.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import * as statics from '../../global';
@Component({
  selector: 'app-attach',
  templateUrl: './attach.component.html',
  styleUrls: ['./attach.component.css']
})
export class AttachComponent implements OnInit {


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private login: LoginService,
    private http: HttpClient,
    private sanitizer: DomSanitizer) {
    this.route.params.subscribe(params => this.assignid = params.id);
    console.log(this.assignid);
    this.loadAttach();
  }

  assignid = '';
  selectedFile: File = null;
  urlAttach = statics.ip + 'attach';
  upProgrus = 0;
  isLoading = false;
  comment = '';
  url = '';


  ngOnInit() {
    // this.login.hasPrivilage("/attach", "home");
    // this.getImage();
  }

  sendToSubject() {
    console.log(this.assignid);
    this.router.navigate(['/sendto/' + this.assignid]);
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    const reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]); // read file as data url


    reader.onload = (imgsrc: any) => { // called once readAsDataURL is completed
      this.url = imgsrc.target.result;
      //this.url = reader.result;
    };

    // console.log(event);
  }

  onUpload() {
    this.isLoading = true;
    const fd = new FormData();
    fd.append('comment', this.comment);
    fd.append('assignid', this.assignid);

    if (this.selectedFile != null) {
      fd.append('attach', this.selectedFile, this.selectedFile.name);
    }

    this.http.post(this.urlAttach, fd, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(events => {
      if (events.type === HttpEventType.UploadProgress) {
        this.upProgrus = Math.round(events.loaded / events.total * 100);
        if (this.upProgrus === 100) {
          this.isLoading = false;
          this.loadAttach();
        }
      } else if (events.type === HttpEventType.Response) {
        console.log(events);
      }
    });
  }



  // mySrc: any;

  //  getImage() {
  //    console.log("get Image");
  //    this.http.get(this.urlAttach, {
  //      responseType: 'blob'
  //    }).subscribe(data => {
  //      let objectURL = URL.createObjectURL(data);
  //      this.mySrc = this.sanitizer.bypassSecurityTrustUrl(objectURL);
  //      console.log(this.mySrc);
  //    });
  //  }


  loadUploaded() {

  }


  attach = [];
  loadAttach() {
    this.attach = [];
    this.http.get(this.urlAttach + '/' + this.assignid).subscribe(data => {
      const array = JSON.parse(JSON.stringify(data));
      for (let i = 0; i < array.length; i++) {
        this.http.get(this.urlAttach + "/img/" + array[i].job_attach, {
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




}
