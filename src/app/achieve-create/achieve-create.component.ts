import {Component, OnInit, Input} from '@angular/core';
import {UserService} from '../services/user.service';
import {ActivatedRoute} from '@angular/router';
import * as decode from 'jwt-decode';

@Component({
  selector: 'app-achieve-create',
  templateUrl: './achieve-create.component.html',
  styleUrls: ['./achieve-create.component.css']
})
export class AchieveCreateComponent implements OnInit {

  constructor(private userserv: UserService, private route: ActivatedRoute) {
  }

  public groupId: any;

  public achname;
  public achcontent;
  public achreward = '+ Respect';
  public value;
  public token = localStorage.getItem('token');
  public tokenPayload = <any>{};

  ngOnInit() {
    this.tokenPayload = decode(this.token);
    this.route.params.subscribe(data => {
      this.groupId = data.id;
    });

  }

  createAchieve() {
    const myobj = {
      name: this.achname, content: this.achcontent, groupId: this.groupId, reward: this.achreward,
      value: this.value, author: this.tokenPayload.subject, users: []
    };
    if ( this.achname && this.achcontent && this.value) {
      console.log(myobj);
      this.userserv.postAchieve(myobj).subscribe(res => {
      });
    }
  }

  getDate() {
    const dateNow = new Date().toLocaleString();
    console.log(dateNow);
  }
}
