import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as statics from '../../global';
import * as allert from '../../allert';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  url = statics.ip + 'onlinecustomer/';
  mg: allert.Globle;

  constructor(private http: HttpClient, private router: Router) {
    this.mg = new allert.Globle();
  }

  email = new FormControl('', [Validators.required, Validators.email]);
  name = new FormControl('', [Validators.required]);
  nic = new FormControl('', [Validators.required]);
  mobile = new FormControl('', [Validators.required, Validators.minLength(10)]);
  pword = new FormControl('', [Validators.required, Validators.minLength(4)]);

  ngOnInit() {

  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  getErrorMessageName() {
    return this.name.hasError('required') ? 'You must enter a your Name' : '';
  }

  getErrorMessageNic() {
    return this.nic.hasError('required') ? 'You must enter a your NIC' : '';
  }

  getErrorMessageMobile() {
    return this.mobile.hasError('required') ? 'You must enter a your Mobile Number' :
      this.mobile.hasError('lenght') ? '' : 'User 10 Digits';
  }

  getErrorMessagePword() {
    return this.pword.hasError('required') ? 'You must enter a your Password' :
      this.mobile.hasError('lenght') ? '' : 'Password Minimum Lenght is 4';
  }


  register() {
    // this.mg.message('error', 'Ela Kiri');
    // this.mg.message('success', 'Ela Kiri');
    // this.mg.message('warning', 'Ela Kiri');
    // this.mg.message('info', 'Ela Kiri');
    // this.mg.message('question', 'Ela Kiri');

    const body = {
      email: this.email.value,
      nic: this.nic.value,
      fullname: this.name.value,
      mobile: this.mobile.value,
      pword: this.pword.value,
      status: 0
    };

    console.log(body.email.toString().length);
    if (
      body.email.toString().length > 4
      && body.fullname.toString().length > 4
      && body.nic.toString().length > 6
      && body.mobile.toString().length > 9
      && body.pword.toString().length > 3
    ) {
      this.http.post(this.url, body).subscribe(res => {
        console.log(res['mg']);
        if (res['status'] == 0) {
          this.mg.message('info', res['mg']);
          this.router.navigate(['/login']);
        } else {
          this.mg.message('success', res['mg']);
          this.router.navigate(['/conferm/' + res['mobile']]);
        }
      });
    } else {
      this.mg.message('warning', 'Your information not valid');
    }


  }
}
