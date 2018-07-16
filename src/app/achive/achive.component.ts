import {Component, OnInit, Input} from '@angular/core';
import {UserService} from '../services/user.service';
import * as decode from 'jwt-decode';
import {_catch} from 'rxjs/operator/catch';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-achive',
  templateUrl: './achive.component.html',
  styleUrls: ['./achive.component.css']
})
export class AchiveComponent implements OnInit {
  @Input() groupId: string;
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
  public submitAchAuth;
  public submittedPayload;

  constructor(private userserv: UserService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.userserv.getAchieve().subscribe(data => {
      this.achInfo = data;
      this.route.params.subscribe(grId => {
        this.getAchieve = this.achInfo.filter(ach => ach.groupId === grId.id);
      });
    });
    // this.userserv.getUser()
    this.tokenPayload = decode(this.token);

  }

  submitAchieve(id) {
    const achieveId = {id: id};
    // this.achieveSubmitToUser(id);
    this.userserv.getAchievesById(achieveId).subscribe(data => {
      this.achInfo = data;
      this.sendSubmDetToAutor(data);
      this.sendAchDetToUserSubmitted(data);
      const ora = this.achInfo.users.filter(user => user.id === this.tokenPayload.subject);
      if (ora.length === 0) {
        const myd = {id: this.tokenPayload.subject};
        this.userserv.getUser(myd).subscribe(user => {
          console.log(user);
          this.achInfo.users.push({id: user._id, username: user.username, icon: user.icon});
          this.userDetails = {id: this.achInfo._id, users: this.achInfo.users};
          this.userserv.modifyAchieve(this.userDetails).subscribe(res => {
          });
        });

      } else {
      }
    });
  }

  // achieveSubmitToUser(achid) {
  //   const userId = {id: this.tokenPayload.subject};
  //   this.userserv.getUser(userId).subscribe(data => {
  //     this.userInfo = data;
  //     const userAchieves = this.userInfo.achieves.filter(achieve => achieve.id === achid);
  //     if (userAchieves.length === 0) {
  //       this.userInfo.achieves.push({id: achid});
  //       this.userAchieveDetails = {id: this.tokenPayload.subject, achieves: this.userInfo.achieves};
  //       this.userserv.updateUser(this.userAchieveDetails).subscribe(res => {
  //       });
  //     } else {
  //     }
  //   });
  // }
  sendSubmDetToAutor(dat) {
    const userId = {id: dat.author};
    this.userserv.getUser(userId).subscribe(data => {
      this.submitAchAuth = data;
      if (dat.author === this.tokenPayload.subject) {
        console.log('r u eblan? u r author');
      } else {
        const validSubmitAuth = this.submitAchAuth.submittedAchieves.filter(achieve =>
          achieve.achieveId === dat._id && achieve.userId === this.tokenPayload.subject);
        console.log(validSubmitAuth);
        if (validSubmitAuth.length === 0) {
          this.submitAchAuth.submittedAchieves.push({achieveId: dat._id, userId: this.tokenPayload.subject, isSubmitted: false});
          const idPayload = {id: dat.author, submittedAchieves: this.submitAchAuth.submittedAchieves};
          this.userserv.updateUser(idPayload).subscribe(res => {
          });
        }
      }
    });
  }

  sendAchDetToUserSubmitted(dat) {
    const userId = {id: this.tokenPayload.subject};
    this.userserv.getUser(userId).subscribe(res => {
      this.submittedPayload = res;
      if (this.tokenPayload.subject !== dat.author) {
        const validUserSubscribe = this.submittedPayload.subscribedAchieves.filter(achieve => achieve.achieved === dat._id);
        if (validUserSubscribe.length === 0) {
          this.submittedPayload.subscribedAchieves.push({achieved: dat._id, authorId: dat.author, isSubmittd: false});
          const dataPayload = {id: this.tokenPayload.subject, subscribedAchieves: this.submittedPayload.subscribedAchieves};
          this.userserv.updateUser(dataPayload).subscribe(res => {
          });
        }
      }

    });
  }

  giveLukas(id) {
    this.lukas++;
    const mylukas = {id: id, likes: this.lukas};
    this.userserv.modifyAchieve(mylukas).subscribe(res => {
    });

  }


}
