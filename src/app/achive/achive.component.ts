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
      let check = true;
      let i = 0;
      try {
        do {
          console.log(this.achInfo.users);

          if (this.achInfo.users.length !== 0 && this.achInfo.users[i].id === this.tokenPayload.subject) {
            console.log('updated ' + check);
            check = false;
            break;
          } else if (this.achInfo.users.length === 0 )  {
            check = true;
            console.log('breaked ' + check);
            break;
          } else {
            check = true;
            console.log(check + 'wtf');
          }
          i++;
        }
        while (i < this.achInfo.users.length) ;

        if (check) {
          console.log(check);
          this.achInfo.users.push({id: this.tokenPayload.subject});
          this.userDetails = {id: this.achInfo._id, users: this.achInfo.users};
          this.userserv.modifyAchieve(this.userDetails).subscribe(res => {
          });
        }

      } catch (err) {
        if (check) {
          console.log(check);
          this.achInfo.users.push({id: this.tokenPayload.subject});
          this.userDetails = {id: this.achInfo._id, users: this.achInfo.users};
          this.userserv.modifyAchieve(this.userDetails).subscribe(res => {
          });

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
