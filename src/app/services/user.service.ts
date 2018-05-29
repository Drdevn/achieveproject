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

  getUsers(): Observable <IUser[]> {
    return this.http.get<IUser[]>(this.userurl);
   }

   addUser(req, url:string): Observable <IUser>{
    return this.http.post<IUser>(this.userurl+ url, req)
  }

}
// private db: AngularFireDatabase