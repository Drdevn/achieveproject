import {Component, OnInit, Input} from '@angular/core';
import {UserService} from '../services/user.service';
import * as decode from 'jwt-decode';
import {_catch} from 'rxjs/operator/catch';


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
  public userInfo;
  public alreadySubbed;
  public userDetails;
  public userAchieveDetails;

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
    this.achieveSubmitToUser(id);
    this.userserv.getAchievesById(achieveId).subscribe(data => {
      this.achInfo = data;
      const ora = this.achInfo.users.filter(user => user.id === this.tokenPayload.subject);
      if ( ora.length === 0 ) {
        this.achInfo.users.push({id: this.tokenPayload.subject});
            this.userDetails = {id: this.achInfo._id, users: this.achInfo.users};
            this.userserv.modifyAchieve(this.userDetails).subscribe(res => {
            });
      } else {
        console.log('np');
      }
    });
  }

  achieveSubmitToUser(achid) {
    const userId = {id: this.tokenPayload.subject};
    this.userserv.getUser(userId).subscribe(data => {
      this.userInfo = data;
      const userAchieves = this.userInfo.achieves.filter( achieve => achieve.id === achid);
      console.log(achid);
      if ( userAchieves.length === 0) {
        this.userInfo.achieves.push({id: achid});
        this.userAchieveDetails = {id: this.tokenPayload.subject, achieves: this.userInfo.achieves};
        this.userserv.updateUser(this.userAchieveDetails).subscribe(res => {
        });
      } else {
        console.log('good');
      }
  });
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
