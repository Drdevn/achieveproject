import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { ButtonsModule, BsDropdownModule, ModalModule, AccordionModule } from 'ngx-bootstrap';
import { AppComponent } from './app.component';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AuthService} from './services/auth.service';
import {LocationStrategy} from '@angular/common';
import {HashLocationStrategy} from '@angular/common';
import { UserService } from './services/user.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    TypeaheadModule.forRoot(),
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
