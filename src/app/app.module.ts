import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ButtonsModule, BsDropdownModule, ModalModule, AccordionModule } from 'ngx-bootstrap';
import { AppComponent } from './app.component';
import {  } from 'ngx-bootstrap';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
// import { environment} from '../environments/environment';
import {AuthService} from './services/auth.service';
import {LocationStrategy} from '@angular/common';
import {HashLocationStrategy} from '@angular/common';
import { FrontPageComponent } from './front-page/front-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserPageComponent } from './user-page/user-page.component';
// import { ModalModule } from 'ngx-bootstrap';
import{ UserService } from './services/user.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AchiveComponent } from './achive/achive.component';
import { GroupsComponent } from './groups/groups.component'

@NgModule({
  declarations: [
    AppComponent,
    FrontPageComponent,
    PageNotFoundComponent,
    UserPageComponent,
    AchiveComponent,
    GroupsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    // AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
    HttpClientModule,
    AngularFireAuthModule,
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }, AuthService, AuthGuard, UserService,
{
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptorService,
  multi: true
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
