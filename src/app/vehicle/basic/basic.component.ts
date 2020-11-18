import { Component, OnInit } from '@angular/core';
import * as statics from '../../global';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { userInfo } from 'os';
import * as allert from '../../allert';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})

export class BasicComponent implements OnInit {
  urlVehicle = statics.ip + 'vehicle/';
  mg: allert.Globle;

  constructor(private http: HttpClient, private router: Router, private datePipe: DatePipe, private ar: ActivatedRoute) {
    this.loadCombo();
    this.mg = new allert.Globle();

    const arrr = JSON.parse(sessionStorage.getItem('loged'));
    this.userId = arrr[0].idUser;

  }

  forUpdates;
  basicID;

  userId;

  colors;
  color;

  types;
  type;

  makes;
  make;

  origins;
  origin;

  transmitions;
  transmition;

  conditions;
  condition;

  provinces;
  province;

  registrationNo;
  registrationDate;
  model;
  chassisNo;
  localAgent;
  manufacturedYear;
  purchasedValue;
  purchasedDate;
  passengerCapacity;
  lono;
  typeOfBody;
  payLoad;
  description;


  fuels;
  fuel;
  ftank;
  frtank;

  oiltyps;
  oiltyp1; o1c;
  oiltyp2; o2c;
  oiltyp3; o3c;
  oiltyp4; o4c;
  oiltyp5; o5c;
  oiltyp6; o6c;
  oiltyp7; o7c;
  oiltyp8; o8c;
  oiltyp9; o9c;
  oiltyp10; o10c;


  enginNo;
  enginType;
  horsepower;
  injectionPump;
  atomiser;
  coil;
  lighting;
  cylinders;
  bore;
  strock;
  carburettor;
  jetsmainSize;
  compensating;
  choke;

  insurenceTypes;
  insurenceType;

  btype; voltage; amperage; length; width; height;
  tfsize; tfpressure; tbsize; tbpressure;






  ngOnInit() {
    this.ar.params.subscribe(params => {
      this.basicID = params.id;
      if (this.basicID && this.basicID > 0) {
        this.forUpdates = true;
        console.log(this.basicID + '  -  ' + this.forUpdates);
        this.getBasic();
        this.getOil();
        this.getEngin();
        this.getBattery();
        this.getTayer();
      } else {
        this.forUpdates = false;
        console.log(this.basicID + '  -  ' + this.forUpdates);
      }
    });
  }

  loadCombo() {

    this.http.post(this.urlVehicle + 'getColors', {}).subscribe(res => {
      this.colors = res;
      //   console.log(this.colors);
    });

    this.http.post(this.urlVehicle + 'getTypes', {}).subscribe(res => {
      this.types = res;
      // console.log(this.types);
    });

    this.http.post(this.urlVehicle + 'getMake', {}).subscribe(res => {
      this.makes = res;
      //  console.log(this.makes);
    });

    this.http.post(this.urlVehicle + 'getOrigin', {}).subscribe(res => {
      this.origins = res;
      //  console.log(this.origins);
    });

    this.http.post(this.urlVehicle + 'getTransmition', {}).subscribe(res => {
      this.transmitions = res;
      //  console.log(this.transmitions);
    });

    this.http.post(this.urlVehicle + 'getCondition', {}).subscribe(res => {
      this.conditions = res;
      //  console.log(this.conditions);
    });

    this.http.post(this.urlVehicle + 'getProvince', {}).subscribe(res => {
      this.provinces = res;
      //  console.log(this.conditions);
    });

    this.http.post(this.urlVehicle + 'getFuel', {}).subscribe(res => {
      this.fuels = res;
      //  console.log(this.conditions);
    });

    this.http.post(this.urlVehicle + 'getOilTypes', {}).subscribe(res => {
      this.oiltyps = res;
      // console.log(this.oiltyps);
    });

    this.http.post(this.urlVehicle + 'getInsuranceType', {}).subscribe(res => {
      this.insurenceTypes = res;
      //   console.log(this.insurenceTypes);
    });


  }

  saveBasic() {
    const basic = {
      vehicleType: this.type,
      make: this.make,
      origins: this.origin,
      color: this.color,
      transmission: this.transmition,
      condition: this.condition,
      province: this.province,
      registrationNo: this.registrationNo,
      registrationDate: new DatePipe('en').transform(this.registrationDate, 'yyyy-MM-dd'),
      model: this.model,
      chassisNo: this.chassisNo,
      localAgent: this.localAgent,
      manufacturedYear: this.manufacturedYear,
      purchasedValue: this.purchasedValue,
      purchasedDate: new DatePipe('en').transform(this.purchasedDate, 'yyyy-MM-dd'),
      passengerCapacity: this.passengerCapacity,
      lono: this.lono,
      typeOfBody: this.typeOfBody,
      payLoad: this.payLoad,
      description: this.description,
      idUser: this.userId,
      basicID: this.basicID
    };


    if (this.forUpdates) {
      this.http.post<any>(this.urlVehicle + 'updateBasic', basic).subscribe(res => {
        const x = res;
        this.mg.message('success', 'Vehicle Updated');
      });
    } else {
      this.http.post<any>(this.urlVehicle + 'saveBasic', basic).subscribe(res => {
        const x = res;
        if (x.insertId > 0) {
          this.basicID = x.insertId;
          this.mg.message('success', 'New Vehicle Added');
          this.forUpdates = true;
        } else {

        }
      });
    }



  }

  getBasic() {
    this.http.post<any>(this.urlVehicle + 'getBasic', { id: this.basicID }).subscribe(res => {
      const data = res[0];
      this.color = data.V_color_idV_color;
      this.type = data.V_type_idV_type;
      this.make = data.V_make_idV_make;
      this.origin = data.V_Origin_idV_Origin;
      this.transmition = data.V_transmision_idV_transmision;
      this.condition = data.V_condition_idV_condition;
      this.province = data.V_provincecode_idV_provincecode;
      this.registrationNo = data.vbf_regno1;
      this.registrationDate = data.vbf_regdate;
      this.model = data.vbf_modle;
      this.chassisNo = data.vbf_chassis;
      this.localAgent = data.vbf_localagent;
      this.manufacturedYear = data.vbf_myear;
      this.purchasedValue = data.vbf_pvalue;
      this.purchasedDate = data.V_parchers_date;
      this.passengerCapacity = data.vbf_pcapacity;
      this.lono = data.V_lono;
      //  this.typeOfBody =data.V_Basicinfocol;
      this.payLoad = data.V_payload;
      this.description = data.V_Basicinfocol;
    });
  }

  saveOil() {
    const oil = {
      basicID: this.basicID,
      fuel: this.fuel,
      ftank: this.ftank,
      frtank: this.frtank,
      oiltyp1: this.oiltyp1,
      oiltyp2: this.oiltyp2,
      oiltyp3: this.oiltyp3,
      oiltyp4: this.oiltyp4,
      oiltyp5: this.oiltyp5,
      oiltyp6: this.oiltyp6,
      oiltyp7: this.oiltyp7,
      oiltyp8: this.oiltyp8,
      oiltyp9: this.oiltyp9,
      oiltyp10: this.oiltyp10,
      o1c: this.o1c,
      o2c: this.o2c,
      o3c: this.o3c,
      o4c: this.o4c,
      o5c: this.o5c,
      o6c: this.o6c,
      o7c: this.o7c,
      o8c: this.o8c,
      o9c: this.o9c,
      o10c: this.o10c
    };
    this.http.post<any>(this.urlVehicle + 'saveOil', oil).subscribe(res => {
      const x = res;
      this.mg.message('success', 'Oil Information Saved');
    });
  }


  getOil() {
    this.http.post<any>(this.urlVehicle + 'getOil', { id: this.basicID }).subscribe(res => {
      console.log(res);
      console.log('oils ------------------------------------------');
      const data = res[0];
      if (data) {
        this.fuel = data.fueltype;
        this.ftank = data.fuelMainCapacity;
        this.frtank = data.fuelReserveCapacity;
        this.oiltyp1 = data.vof_engin_oil;
        this.oiltyp2 = data.vof_gear_oil;
        this.oiltyp3 = data.vof_differential_oil;
        this.oiltyp4 = data.vof_hydraulic_oil;
        this.oiltyp5 = data.vof_transmission_oil;
        this.oiltyp6 = data.vof_steering_oil;
        this.oiltyp7 = data.vof_brake_oil;
        this.oiltyp8 = data.vof_cluth_oil;
        this.oiltyp9 = data.vof_crankcase_oil;
        this.oiltyp10 = data.vof_shokabsob_oil;
        this.o1c = data.vof_engin_cap;
        this.o2c = data.vof_gear_cap;
        this.o3c = data.vof_differential_cap;
        this.o4c = data.vof_hydraulic_cap;
        this.o5c = data.vof_transmission_cap;
        this.o6c = data.vof_steering_cap;
        this.o7c = data.vof_brake_cap;
        this.o8c = data.vof_capacity;
        this.o9c = data.vof_crankcase_cap;
        this.o10c = data.vof_shokabsob_cap;
      }
    });
  }


  saveEngin() {
    const engin = {
      basicID: this.basicID,
      enginNo: this.enginNo,
      enginType: this.enginType,
      horsepower: this.horsepower,
      injectionPump: this.injectionPump,
      atomiser: this.atomiser,
      coil: this.coil,
      lighting: this.lighting,
      cylinders: this.cylinders,
      bore: this.bore,
      strock: this.strock,
      carburettor: this.carburettor,
      jetsmainSize: this.jetsmainSize,
      compensating: this.compensating,
      choke: this.choke
    };
    this.http.post<any>(this.urlVehicle + 'saveEngin', engin).subscribe(res => {
      const x = res;
      this.mg.message('success', 'Engin Information Saved');
    });
  }

  getEngin() {
    this.http.post<any>(this.urlVehicle + 'getEngin', { id: this.basicID }).subscribe(res => {
      const data = res[0];
      if (data) {
        this.enginType = data.engin_type;
        this.horsepower = data.horsepower;
        this.injectionPump = data.injection_pump;
        this.atomiser = data.atomiser;
        this.coil = data.coil;
        this.lighting = data.lighting;
        this.cylinders = data.cylinders;
        this.bore = data.bore;
        this.strock = data.strock;
        this.carburettor = data.carburettor;
        this.jetsmainSize = data.jetsmain_size;
        this.compensating = data.compensating;
        this.choke = data.choke;
      }
    });
  }


  saveBattery() {
    const batry = {
      basicID: this.basicID,
      btype: this.btype,
      voltage: this.voltage,
      amperage: this.amperage,
      length: this.length,
      width: this.width,
      height: this.height
    };
    this.http.post<any>(this.urlVehicle + 'saveBattry', batry).subscribe(res => {
      const x = res;
      this.mg.message('success', 'Battery Information Saved');
    });
  }

  getBattery() {
    this.http.post<any>(this.urlVehicle + 'getBattry', { id: this.basicID }).subscribe(res => {
      const data = res[0];
      if (data) {
        this.btype = data.btype;
        this.voltage = data.voltage;
        this.amperage = data.amperage;
        this.length = data.length;
        this.width = data.width;
        this.height = data.height;
      }
    });
  }

  saveTayar() {
    const tayar = {
      basicID: this.basicID,
      tfsize: this.tfsize,
      tfpressure: this.tfpressure,
      tbsize: this.tbsize,
      tbpressure: this.tbpressure
    };
    this.http.post<any>(this.urlVehicle + 'saveTayer', tayar).subscribe(res => {
      const x = res;
      this.mg.message('success', 'Tayar Information Saved');
    });
  }

  getTayer() {
    this.http.post<any>(this.urlVehicle + 'getTayer', { id: this.basicID }).subscribe(res => {
      const data = res[0];
      if (data) {
        this.tfsize = data.sizefront;
        this.tfpressure = data.pressurefront;
        this.tbsize = data.sizerear;
        this.tbpressure = data.pressurerear;
      }
    });
  }

  goToTools() {
    this.router.navigate(['v/toosl', this.basicID]);
  }

  goToFuelC() {
    this.router.navigate(['v/fuelc', this.basicID]);
  }

  goToLicences() {
    this.router.navigate(['v/license', this.basicID]);
  }

  goToRepairs() {
    this.router.navigate(['v/repairs', this.basicID]);
  }

  goToTyres() {
    this.router.navigate(['v/tyres', this.basicID]);
  }

  goToService() {
    this.router.navigate(['v/service', this.basicID]);
  }

  goToChange() {
    this.router.navigate(['v/driver', this.basicID]);
  }

  goToUpload() {
    this.router.navigate(['v/upload', this.basicID]);
  }



}
