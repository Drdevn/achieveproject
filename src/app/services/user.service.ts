import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IUser } from '../models/user';

@Injectable()
export class UserService {
public userurl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }
  
  getUsers(): Observable <IUser[]> {
    return this.http.get<IUser[]>(this.userurl);
   }

   addUser(req, url:string): Observable <IUser>{
    return this.http.post<IUser>(this.userurl+ url, req)
   
  }
}
// private db: AngularFireDatabase