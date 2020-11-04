import { Component, ResolvedReflectiveFactory } from '@angular/core';
import { LoginService } from './service/login/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  constructor(private router: Router) {
    let type = sessionStorage.getItem('utype');
    if (type != null) {
      if (type == '1') {
        this.router.navigate(['/dash']);
      } else {
        this.router.navigate(['/onhome']);
      }
    } else {
      this.router.navigate(['/home']);
    }
  }

  title = 'WEB';
  opened = false;




  isLog() {
    let loged = sessionStorage.getItem('loged');
    if (loged != null) {
      return true;
    } else {
      return false;
    }

  }

  getUserType() {
    let type = sessionStorage.getItem('utype');
    if (type != null) {
      if (type == '1') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }





}


