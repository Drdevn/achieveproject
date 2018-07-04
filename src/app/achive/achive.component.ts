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

  submitAchieve(idn) {
    const idin = {id: idn};
    this.userserv.getAchievesById(idin).subscribe(data => {
      this.achInfo = data;
      this.achieveSubmitToUser(this.achInfo);
      if (this.achInfo.users.author !== null) {
        // const submitData = {};
        this.achInfo.users.push({id: this.tokenPayload.subject, author: this.achInfo.users.author});
        const request = {id: idn, users: this.achInfo.users};
        console.log(this.achInfo.users);
        this.userserv.modifyAchieve(request).subscribe(res => {
        });
      } else {
        // const submitData = {};
        this.achInfo.users.push({id: this.tokenPayload.subject});
        const request = {id: idn, users: this.achInfo.users};
        this.userserv.modifyAchieve(request).subscribe(res => {
        });
      }
    });
  }

  achieveSubmitToUser(achDet) {
    const userId = {id: this.tokenPayload.subject};
    let check = true;
    this.userserv.getUser(userId).subscribe(data => {
      this.userDetails = data;
      console.log(this.userDetails.achieves);
      for (let i = 0; i <= this.userDetails.achieves.length; i++) {
        if (this.userDetails.achieves[i].id === achDet._id) {
          console.log('me');
          check = false;
          break;
        } else {
          check = true;
        }
      }
      if (check) {
        this.userDetails.achieves.push({id: achDet._id, name: achDet.name});
        const pushToUserAchieves = {id: this.tokenPayload.subject, achieves: this.userDetails.achieves};
        console.log('ty ne pidor');
        this.userserv.updateUser(pushToUserAchieves).subscribe(res => {
        });
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
      value: this.value, users: [{author: this.tokenPayload.subject}]
    };
    console.log(myobj);
    this.userserv.postAchieve(myobj).subscribe(res => {
    });
  }
}
