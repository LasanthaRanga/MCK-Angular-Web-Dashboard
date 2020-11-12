import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routComponents } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { DatePipe } from '@angular/common';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
// servises
import { JobtypesService } from './service/jobtypes.service';
import { LoginService } from './service/login/login.service';
import { UsersubjectsComponent } from './job_assign/usersubjects/usersubjects.component';
import { DialogComponent } from './dialog/dialog.component';









@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    routComponents,
    UsersubjectsComponent,
    DialogComponent
  ],
  entryComponents: [DialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatSlideToggleModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    HttpClientModule,
    NgxMatSelectSearchModule,
    SweetAlert2Module,
    CarouselModule.forRoot()
  ],
  providers: [JobtypesService, LoginService, AppComponent, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
