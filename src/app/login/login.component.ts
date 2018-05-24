import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 public email;
 public password;
  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit() {
  }
  signUp() {
    this.authService.signup(this.email, this.password);
  }
  login() {
    this.authService.login(this.email, this.password);
  }

}
