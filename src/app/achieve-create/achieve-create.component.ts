import {Component, OnInit, Input} from '@angular/core';
import {UserService} from '../services/user.service';
import * as decode from 'jwt-decode';

@Component({
  selector: 'app-achieve-create',
  templateUrl: './achieve-create.component.html',
  styleUrls: ['./achieve-create.component.css']
})
export class AchieveCreateComponent implements OnInit {

  constructor(private userserv: UserService) {
  }

  public groupId;
  public achname;
  public achcontent;
  public achreward = '+ Respect';
  public value;
  public token = localStorage.getItem('token');
  public tokenPayload = <any>{};

  ngOnInit() {
    this.tokenPayload = decode(this.token);
  }

  createAchieve() {
    const myobj = {
      name: this.achname, content: this.achcontent, reward: this.achreward,
      value: this.value, author: this.tokenPayload.subject, users: []
    };
    console.log(myobj);
    this.userserv.postAchieve(myobj).subscribe(res => {
    });
  }
}
