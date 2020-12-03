import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as statics from '../../global';
import * as allert from '../../allert';
import { LoginService } from '../../../app/service/login/login.service';
import { DatePipe } from '@angular/common';

export interface Obj {
  lya: number;
  lyw: number;
  tya: number;
  tyw: number;
  qpay: number;
  tot: number;
}


@Component({
  selector: 'app-payassess',
  templateUrl: './payassess.component.html',
  styleUrls: ['./payassess.component.css']
})




export class PayassessComponent implements OnInit {

  url = statics.ip + 'assess_data/';
  urlPay = statics.ip + 'onpay/';
  mg: allert.Globle;

  user_id;

  amount;
  fullPay;
  onRate;
  onValue;

  disable = false;
  reson;


  kformid;
  assdata = {
    idAssessment: 0,
    assessment_no: '',
    street_name: '',
    ward_name: '',
    cus_name: '  ',
    cus_nic: '',
    title_name: '',
    ass_allocation: '',
    ass_nature_name: '',
    ass_nature_year_rate: '',
    ass_nature_warrant_rate: '',
    ass_discription: ''
  };

  obj = {
    lya: 0.00,
    lyw: 0.00,
    tya: 0.00,
    tyw: 0.00,
    qpay: 0.00,
    tot: 0.00
  };

  fullname = '';
  mobile = '';
  nic = '';
  email = '';
  cusid = 0;


  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private login: LoginService) {
    this.route.params.subscribe(params => {
      if (params.id != null) {
        this.kformid = params.id;
        this.collectAssessmentData();
        this.collectAssessmentValues();
        this.getOnlineRate();
        this.isDisabled();
      }
    });

    const xx = sessionStorage.getItem('loged');
    const yy = JSON.parse(xx);
    // console.log(yy);
    this.user_id = yy[0].idOnline;
    this.fullname = yy[0].fullname;
    this.mobile = yy[0].mobile;
    this.nic = yy[0].nic;
    this.email = yy[0].email;
    this.cusid = yy[0].idOnline;
  }

  ngOnInit() {

  }


  collectAssessmentData() {
    this.http.get(this.url + '/' + this.kformid).subscribe(data => {
      this.assdata = data[0];
    });
  }

  collectAssessmentValues() {
    const year = new Date().getFullYear();
    this.http.get<Obj>(this.url + '/' + this.kformid + '/' + year).subscribe(data => {
      this.obj = data;
    });
  }

  getOnlineRate() {
    this.http.post(this.urlPay + 'rate', {}).subscribe(res => {
      this.onRate = res[0].rate;
      console.log(this.onRate);
    });
  }

  isDisabled() {
    let dis;
    this.http.post(this.urlPay + 'disabled', { cat: 2 }).subscribe(res => {

      if (res[0]) {

        const time = res[0].block_dateTime;
        this.reson = res[0].reson;

        const disable = new DatePipe('en').transform(time, 'yyyy-MM-dd HH:mm:ss');
        const today = new DatePipe('en').transform(new Date(), 'yyyy-MM-dd HH:mm:ss');


        console.log('----------------------------');
        console.log(disable);
        console.log(today);
        console.log('----------------------------');


        if (disable >= today) {
          this.disable = false;
        } else {
          this.disable = true;
        }
      }

    });
  }

  calTotal() {
    this.amount = Math.round(this.amount * 100) / 100;

    this.onValue = this.amount * this.onRate / 100;
    this.onValue = Math.round(this.onValue * 100) / 100;

    this.fullPay = this.amount + this.onValue;
    this.fullPay = Math.round(this.fullPay * 100) / 100;

  }


  gotoPay() {
    const param = {
      cusid: this.user_id,
      appcat: 2,
      app: this.assdata.idAssessment,
      amount: this.amount,
      fullPay: this.fullPay,
      onValue: this.onValue,
      des: 'pending',
      o1: '-',
      o2: '-'
    };

    this.http.post(this.urlPay + 'pay', param).subscribe(data => {
      console.log(data);
      const onpayid = data['insertId'];
      console.log(onpayid);
      const path = 'https://kgmc.lk/php/HostedCheckoutReturnToMerchant_NVP.php?order_amount=' + this.fullPay +
        '&order_currency=LKR&customer_receipt_email=' + this.email +
        '&appid=' + this.assdata.idAssessment +
        '&onpayid=' + onpayid;
      console.log(path);
      window.location.href = path;
    });



  }

  logOut() {
    this.login.logOut();
  }

}
