import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ButtonsModule } from 'ngx-bootstrap';
import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap';
<<<<<<< HEAD
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { environment} from '../environments/environment';
import {AuthService} from './services/auth.service';
import {LocationStrategy} from '@angular/common';
import {HashLocationStrategy} from '@angular/common';
=======
import { FrontPageComponent } from './front-page/front-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserPageComponent } from './user-page/user-page.component';

>>>>>>> a8f51eb2f4f072beaec87e21f651426c295ad6c1
@NgModule({
  declarations: [
    AppComponent,
    FrontPageComponent,
    PageNotFoundComponent,
    UserPageComponent
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
