import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import * as statics from '../../global';
import * as allert from '../../allert';


@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})




export class ConfirmComponent implements OnInit {

  code = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]);
  mob = '';
  url = statics.ip + 'onlinecustomer/';
  mg: allert.Globle;


  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {
    this.route.params.subscribe(params => {
      if (params.mobile != null) {
        this.mob = params.mobile;
      }
    });
    this.mg = new allert.Globle();
  }

  getErrorMessageCode() {
    return this.code.hasError('required') ? 'You must enter a your Mobile Number' :
      this.code.hasError('lenght') ? '' : 'User 4 Digits';
  }

  ngOnInit() {
  }

  verfy() {
    console.log(this.code.value);
    let bo = {
      mobile: this.mob,
      code: this.code.value
    };
    this.http.post(this.url + 'conferm/', bo).subscribe(res => {

      if (res['status'] == 0) {
        this.mg.message('warning', res['mg']);
      } else {
        this.mg.message('success', res['mg']);
        this.router.navigate(['/login']);
      }

    });
  }

}
