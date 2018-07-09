import {Component, OnInit, Input} from '@angular/core';
import {UserService} from '../services/user.service';
import * as decode from 'jwt-decode';


@Component({
  selector: 'app-achive',
  templateUrl: './achive.component.html',
  styleUrls: ['./achive.component.css']
})
export class AchiveComponent implements OnInit {
  @Input() groupId: string;
  public achname;
  public achcontent;
  public achreward = '+ Respect';
  public value;
  public getAchieve;
  public lukas = 0;
  public token = localStorage.getItem('token');
  public tokenPayload = <any>{};
  public achInfo;
  public achValid;
  public alreadySubbed;
  public userDetails;

  constructor(private userserv: UserService) {
  }

  ngOnInit() {
    this.userserv.getAchieve().subscribe(data => {
      this.getAchieve = data;
    });
    // this.userserv.getUser()
    this.tokenPayload = decode(this.token);
    console.log(this.tokenPayload.subject);

  }

  submitAchieve(id) {
    const achieveId = {id: id};
    this.userserv.getAchievesById(achieveId).subscribe(data => {
      this.achInfo = data;
      for (let i = 0; i <= this.achInfo.users.length; i++) {
        console.log(this.achInfo.users[i]);
        if (this.achInfo.users[i] === undefined  || this.achInfo.users[i].id !== this.tokenPayload.subject) {
          this.achInfo.users.push({ id: this.tokenPayload.subject});
           const modifiedAch = {id: this.achInfo._id, };
          console.log('updated');
        this.userserv.modifyAchieve(modifiedAch).subscribe(res => {
        });
        } else {
          console.log('breaked');
          break;
        }
      }
    });
  }

  achieveSubmitToUser(achDet) {

  }

  giveLukas(id) {
    this.lukas++;
    const mylukas = {id: id, likes: this.lukas};
    this.userserv.modifyAchieve(mylukas).subscribe(res => {
    });

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
