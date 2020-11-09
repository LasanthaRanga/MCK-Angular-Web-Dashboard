import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobtypesComponent } from './job_assign/jobtypes/jobtypes.component';
import { SubjectsComponent } from './job_assign/subjects/subjects.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UsersubjectsComponent } from './job_assign/usersubjects/usersubjects.component';
import { CreatejobComponent } from './job_assign/createjob/createjob.component';
import { AttachComponent } from './job_assign/attach/attach.component';
import { SendtoComponent } from './job_assign/sendto/sendto.component';
import { JobsComponent } from './job_assign/jobs/jobs.component';
import { MyjobsComponent } from './job_assign/myjobs/myjobs.component';
import { UniqueComponent } from './job_assign/unique/unique.component';
import { OneComponent } from './job_assign/one/one.component';
import { RegisterComponent } from './online/register/register.component';
import { ConfirmComponent } from './online/confirm/confirm.component';
import { PmapComponent } from './online/pmap/pmap.component';
import { OnhomeComponent } from './online/onhome/onhome.component';
import { Dashboard1Component } from './job_assign/dashboard1/dashboard1.component';
import { WatingComponent } from './wating/wating.component';
import { PayassessComponent } from './online/payassess/payassess.component';
import { PaynowComponent } from './online/paynow/paynow.component';
import { PrivilagesComponent } from './job_assign/privilages/privilages.component';
import { AlljobsComponent } from './job_assign/alljobs/alljobs.component';
import { MapapproveComponent } from './online/mapapprove/mapapprove.component';
import { AllComponent } from './vehicle/all/all.component';
import { FullinfoComponent } from './vehicle/fullinfo/fullinfo.component';
import { BasicComponent } from './vehicle/basic/basic.component';
import { ToolsComponent } from './vehicle/tools/tools.component';
import { FuelcComponent } from './vehicle/fuelc/fuelc.component';
import { LicensComponent } from './vehicle/licens/licens.component';
import { UploadComponent } from './vehicle/upload/upload.component';
import { RepairsComponent } from './vehicle/repairs/repairs.component';
import { TyresComponent } from './vehicle/tyres/tyres.component';
import { ServceComponent } from './vehicle/servce/servce.component';
import { DriverComponent } from './vehicle/driver/driver.component';
import { MixComponent } from './admin/mix/mix.component';


const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'wating', component: WatingComponent },
  { path: 'home', component: HomeComponent },
  { path: 'jobtypes', component: JobtypesComponent },
  { path: 'subjects', component: SubjectsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'usersubject', component: UsersubjectsComponent },
  { path: 'createjob', component: CreatejobComponent },
  { path: 'attach/:id', component: AttachComponent },
  { path: 'sendto/:id', component: SendtoComponent },
  { path: 'jobs/:id', component: JobsComponent },
  { path: 'jobs', component: JobsComponent },
  { path: 'myjobs', component: MyjobsComponent },
  { path: 'unique', component: UniqueComponent },
  { path: 'one/:id', component: OneComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'conferm/:mobile', component: ConfirmComponent },
  { path: 'pmap', component: PmapComponent },
  { path: 'onhome', component: OnhomeComponent },
  { path: 'dash', component: Dashboard1Component },
  { path: 'payassess/:id', component: PayassessComponent },
  { path: 'paynow/:id/:amount', component: PaynowComponent },
  { path: 'privilages', component: PrivilagesComponent },
  { path: 'alljobs', component: AlljobsComponent },
  { path: 'mapapprove', component: MapapproveComponent },
  { path: 'allvehicle', component: AllComponent },
  { path: 'v/fullinfo/:id', component: FullinfoComponent },
  { path: 'v/basic/:id', component: BasicComponent },
  { path: 'v/basic', component: BasicComponent },
  { path: 'v/toosl/:id', component: ToolsComponent },
  { path: 'v/fuelc/:id', component: FuelcComponent },
  { path: 'v/license/:id', component: LicensComponent },
  { path: 'v/upload/:id', component: UploadComponent },
  { path: 'v/repairs/:id', component: RepairsComponent },
  { path: 'v/tyres/:id', component: TyresComponent },
  { path: 'v/service/:id', component: ServceComponent },
  { path: 'v/driver/:id', component: DriverComponent },
  { path: 'admin/mix', component:MixComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routComponents = [
  HomeComponent,
  JobtypesComponent,
  SubjectsComponent,
  PageNotFoundComponent,
  LoginComponent,
  UsersubjectsComponent,
  CreatejobComponent,
  AttachComponent,
  SendtoComponent,
  JobsComponent,
  MyjobsComponent,
  UniqueComponent,
  OneComponent,
  RegisterComponent,
  ConfirmComponent,
  PmapComponent,
  OnhomeComponent,
  Dashboard1Component,
  WatingComponent,
  PayassessComponent,
  PaynowComponent,
  PrivilagesComponent,
  AlljobsComponent,
  MapapproveComponent,
  AllComponent,
  FullinfoComponent,
  BasicComponent,
  ToolsComponent,
  FuelcComponent,
  LicensComponent,
  UploadComponent,
  RepairsComponent,
  TyresComponent,
  ServceComponent,
  DriverComponent,
  MixComponent
];
