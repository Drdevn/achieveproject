import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {UserService} from './services/user.service';
import {User} from 'firebase';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userservice: UserService,
              private router: Router) {
  }

  canActivate(): boolean {
    if (this.userservice.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
