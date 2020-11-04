import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
declare let Checkout: any;


@Component({
  selector: 'app-paynow',
  templateUrl: './paynow.component.html',
  styleUrls: ['./paynow.component.css']
})
export class PaynowComponent implements OnInit {


  constructor(private aroute: ActivatedRoute) {
    this.aroute.params.subscribe(params => {
      this.kformid = params.id;
      this.amount = params.amount;
    });

  }


  kformid;
  amount;
  user;
  email;
  ngOnInit() {

    let xx = JSON.parse(sessionStorage.getItem('loged'));
    this.user = xx[0].idOnline;
    this.email = xx[0].email;
  }

  showPaymentPage(){
    console.log("data of this");
  }

}
