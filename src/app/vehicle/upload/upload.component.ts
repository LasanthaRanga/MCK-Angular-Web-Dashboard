import { Component, OnInit, ViewChild } from '@angular/core';
import * as statics from '../../global';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import * as allert from '../../allert';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  urlVehicle = statics.ip + 'vehicle/';
  mg: allert.Globle;
  basicID;


  selectedFile: File = null;
  upProgrus = 0;
  isLoading = false;
  url = '';


  constructor(
    private http: HttpClient,
    private router: Router,
    private datePipe: DatePipe,
    private ar: ActivatedRoute,
    private sanitizer: DomSanitizer

  ) {
    this.mg = new allert.Globle();
  }

  ngOnInit() {
    this.ar.params.subscribe(params => {
      this.basicID = params.id;
      if (this.basicID && this.basicID > 0) {
        this.loadAttach();
      } else { }
    });
  }


  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]); // read file as data url
    reader.onload = (imgsrc: any) => { // called once readAsDataURL is completed
      this.url = imgsrc.target.result;
    };
    // console.log(event);
  }

  onUpload() {
    this.isLoading = true;
    const fd = new FormData();

    fd.append('basicID', this.basicID);

    if (this.selectedFile != null) {
      fd.append('attach', this.selectedFile, this.selectedFile.name);
    }

    this.http.post(this.urlVehicle + 'upload', fd, {
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


  attach = [];
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



}
