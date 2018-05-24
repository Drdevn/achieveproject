import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ButtonsModule } from 'ngx-bootstrap';
import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { environment} from '../environments/environment';
import {AuthService} from './services/auth.service';
import {LocationStrategy} from '@angular/common';
import {HashLocationStrategy} from '@angular/common';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonsModule.forRoot(),
    BsDropdownModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }, AuthService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
