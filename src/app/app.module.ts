import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { registerLocaleData } from '@angular/common';
// import localeFr from '@angular/common/locales/ru';

// the second parameter 'fr' is optional
// registerLocaleData(localeFr, 'ru');

import { AppComponent } from './app.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { HeaderComponent } from './components/header/header.component';
import { DialogComponent } from './components/dialog/dialog.component';

import { Params } from './_service/params';

import {
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatSlideToggleModule,
  MatDialogModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    WrapperComponent,
    HeaderComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    FormsModule,

    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule

  ],
  entryComponents: [ DialogComponent ],
  providers: [
    Params,
    // { provide: LOCALE_ID, useValue: "ru" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
