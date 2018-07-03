import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {IUser} from '../models/user';
import {Router} from '@angular/router';


@Injectable()
export class UserService {
  public userurl = 'http://localhost:3000';
  private registerUrl = 'http://localhost:3000/api/register';
  private loginUrl = 'http://localhost:3000/api/login';
  private icons = 'http://localhost:3000/api/icons';
  private updateuser = 'http://localhost:3000/api/update';
  private getuser = 'http://localhost:3000/api/user';
  private postach = 'http://localhost:3000/api/addach';
  private getach = 'http://localhost:3000/api/ach';
  private getgroup = 'http://localhost:3000/api/group';
  private registergroup = 'http://localhost:3000/api/addgroup';
  private joingroup = 'http://localhost:3000/api/join';
  private adminconByauthor = 'http://localhost:3000/api/admincon';
  private getGroupsListHTTP = 'http://localhost:3000/api/grouplist';
  private modifyAchieves = 'http://localhost:3000/api/modifyachieve';

  constructor(private http: HttpClient, private router: Router) {
  }

  registerUser(user) {
    return this.http.post<any>(this.registerUrl, user);
  }

  registerGroup(req) {
    return this.http.post<any>(this.registergroup, req);
  }

  loginUser(user) {
    return this.http.post<any>(this.loginUrl, user);
  }

  updateUser(req) {
    return this.http.put<any>(this.updateuser + '/' + req.id, req);
  }

  joinGroup(req) {
    return this.http.put<any>(this.joingroup + '/' + req.id, req);
  }

  modifyAchieve(req) {
    return this.http.put(this.modifyAchieves + '/' + req.id, req);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getIcons(): Observable<any> {
    return this.http.get(this.icons);
  }

  getUser(req): Observable<any> {
    return this.http.get(this.getuser + '/' + req.id);
  }

  getGroup(req): Observable<any> {
    return this.http.get(this.getgroup + '/' + req.id);
  }

  getAchievesById(req): Observable<any> {
    return this.http.get(this.getach + '/' + req.id);
  }

  getGroupByAuthor(req): Observable<any> {
    return this.http.get(this.adminconByauthor + '/' + req.id, req);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/front-page']);
  }

  goToFrontPage() {
    this.router.navigate(['/front-page']);
  }

  goToUserPage() {
    this.router.navigate(['/userpage']);
  }

  postAchieve(req) {
    return this.http.post<any>(this.postach, req);
  }

  getAchieve() {
    return this.http.get(this.getach);
  }

  getGroupsList() {
    return this.http.get(this.getGroupsListHTTP);
  }


}
