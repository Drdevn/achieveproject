import {Injectable} from '@angular/core';

import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {
  // user: Observable<firebase.User>;

  constructor() {
//     this.user = firebaseAuth.authState;
//   }
// private firebaseAuth: AngularFireAuth, public router : Router
//   signup(email: string, password: string) {
//     this.firebaseAuth
//       .auth
//       .createUserWithEmailAndPassword(email, password)
//       .then(value => {
//         this.router.navigate(['/front-page']);
//       })
//       .catch(err => {
//         console.log('Something went wrong:', err.message);
//       });
//   }

//   login(email: string, password: string) {
//     this.firebaseAuth
//       .auth
//       .signInWithEmailAndPassword(email, password)
//       .then(value => {
//         this.router.navigate(['/user-page']);
//       })
//       .catch(err => {
//         console.log('Something went wrong:', err.message);
//       });
//   }

//   logout() {
//     localStorage.clear();
//     this.firebaseAuth
//       .auth
//       .signOut();
  }

}
