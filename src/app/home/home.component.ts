import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login/login.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private login: LoginService) { }

  isLogin = false;

  ngOnInit() {
    let arr = JSON.parse(sessionStorage.getItem('loged'));
    if (arr != null) {
      console.log("Logie IN")
      this.isLogin = true;
    } else {
      console.log("Not loged");
      this.isLogin = false;
    }

  }


  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
  logOut() {
    this.login.logOut();
  }
}
