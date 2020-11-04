import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login/login.service';
import { Router } from '@angular/router';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  unames = '';
  pwords = '';

  constructor(private _loginService: LoginService, private router: Router) { }

  ngOnInit() {
    var xx = sessionStorage.getItem('loged');
    if (xx != null) {
      this.router.navigate(['/home']);
    }
  }

  login() {
    console.log(this.unames + this.pwords);
    this._loginService.login(this.unames, this.pwords);
  }



}
