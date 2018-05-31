import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IUser } from '../models/user';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
public userurl = 'http://localhost:3000';
private registerUrl = "http://localhost:3000/api/register"
private loginUrl = "http://localhost:3000/api/login"
private icons = "http://localhost:3000/api/icons"
  constructor(private http: HttpClient, private router: Router) { }
  
  registerUser(user){
    return this.http.post<any>(this.registerUrl, user)
  }

  loginUser(user){
    return this.http.post<any>(this.loginUrl, user)
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }
  getIcons():Observable<any>{
    return this.http.get(this.icons)
  }
  getToken(){
    return localStorage.getItem('token')
  }
  logoutUser(){
    localStorage.removeItem('token')
    this.router.navigate(['/front-page'])
  }
}
// private db: AngularFireDatabase