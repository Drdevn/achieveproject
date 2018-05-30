import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IUser } from '../models/user';

@Injectable()
export class UserService {
public userurl = 'http://localhost:3000';
private registerUrl = "http://localhost:3000/api/register"
private loginUrl = "http://localhost:3000/api/login"
  constructor(private http: HttpClient) { }
  
  registerUser(user){
    return this.http.post<any>(this.registerUrl, user)
  }

  loginUser(user){
    return this.http.post<any>(this.loginUrl, user)
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }
  getToken(){
    return localStorage.getItem('token')
  }
}
// private db: AngularFireDatabase