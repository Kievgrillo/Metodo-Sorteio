import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SorteioComponent } from './sorteio/sorteio.component';

import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule } from "@angular/material/dialog";
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    SorteioComponent,
    NavComponent,
    DialogComponent,
    LoginComponent
  ],

  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    ToastrModule.forRoot(),
    FormsModule,
    MatDialogModule,
    NgxSpinnerModule,
    MatProgressSpinnerModule

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
