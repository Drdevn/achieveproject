import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {ActivatedRoute} from '@angular/router';
import * as decode from 'jwt-decode';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  public groupData = <any>{};
  public token = localStorage.getItem('token');
  public tokenPayload = <any>{};
  public subscribed = true;
  public userInfo;
  public groupsListUpdate = [];
  public value;
  public groupId: any;
  public achname;
  public achcontent;
  public achreward = '+ Respect';
  public achInfo;
  public getAchieve;
  public userDetails;
  public submittedPayload;


  constructor(private userService: UserService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.OnInitData();
    this.tokenPayload = decode(this.token);
    this.route.params.subscribe(data => {
      this.groupId = data.id;
    });
    this.ngOnInitAchiveCo();
  }

  OnInitData() {
    this.route.params.subscribe(param => {
      this.userService.getGroup(param).subscribe(data => {
        this.groupData = data;
        this.submitCheck();
      });
    });

  }

  groupSubscribe() {
    const datId = {id: this.tokenPayload.subject};
    this.userService.getUser(datId).subscribe(data => {
      this.userInfo = data;
      this.groupsListUpdate = this.userInfo.groups;
      this.groupsListUpdate.push({name: this.groupData.name, author: this.groupData.author, id: this.groupData._id});
      const request = {id: this.tokenPayload.subject, groups: this.groupsListUpdate};
      this.userService.updateUser(request).subscribe(res => {
      });
    });
    this.subscribed = false;
  }

  submitCheck() {
    const myid = {id: this.tokenPayload.subject};
    this.userService.getUser(myid).subscribe(data => {
      console.log(this.groupData._id);
      for (let i = 0; i < data.groups.length; i++) {
        if (data.groups[i].id === this.groupData._id) {
          this.subscribed = false;
          break;

        } else {
          this.subscribed = true;
        }
      }
    });

  }

  groupUnsubscribe() {
    const datId = {id: this.tokenPayload.subject};
    this.userService.getUser(datId).subscribe(data => {
      this.userInfo = data.groups;

      console.log(this.userInfo);
      for (let i = 0; i < this.userInfo.length; i++) {
        if (this.userInfo[i].id === this.groupData._id) {
          this.userInfo.splice(i, 1);
        } else {
          console.log('tu pidar');
        }
      }
      const request = {id: this.tokenPayload.subject, groups: this.userInfo};
      this.userService.updateUser(request).subscribe(res => {
      });
    });
    this.subscribed = true;

  }
  /*ACHIVE-CREATE COMPONENT*/
  createAchieve() {
    const myobj = {
      name: this.achname, content: this.achcontent, groupId: this.groupId, reward: this.achreward,
      value: this.value, author: this.tokenPayload.subject, users: []
    };
    if ( this.achname && this.achcontent && this.value) {
      console.log(myobj);
      this.userService.postAchieve(myobj).subscribe(res => {
      });
    }
    this.ngOnInit();
  }

  /*ACHIVE COMPONENT*/
  ngOnInitAchiveCo() {
    this.userService.getAchieve().subscribe(data => {
      this.achInfo = data;
      this.route.params.subscribe(grId => {
        this.getAchieve = this.achInfo.filter(ach => ach.groupId === grId.id);
      });
    });
  }

  submitAchieve(id) {
    const achieveId = {id: id};
    // this.achieveSubmitToUser(id);
    this.userService.getAchievesById(achieveId).subscribe(data => {
      this.achInfo = data;
      // this.sendSubmDetToAutor(data);
      this.sendAchDetToUserSubmitted(data);
      const ora = this.achInfo.users.filter(user => user.id === this.tokenPayload.subject);
      if (ora.length === 0 && this.achInfo.author !== this.tokenPayload.subject) {
        const myd = {id: this.tokenPayload.subject};
        this.userService.getUser(myd).subscribe(user => {
          console.log(user);
          this.achInfo.users.push({id: user._id, username: user.username, icon: user.icon, isSubmited: false});
          this.userDetails = {id: this.achInfo._id, users: this.achInfo.users};
          this.userService.modifyAchieve(this.userDetails).subscribe(res => {
          });
        });
      }
    });
  }

  sendAchDetToUserSubmitted(dat) {
    const userId = {id: this.tokenPayload.subject};
    this.userService.getUser(userId).subscribe(res => {
      this.submittedPayload = res;
      if (this.tokenPayload.subject !== dat.author) {
        const validUserSubscribe = this.submittedPayload.subscribedAchieves.filter(achieve => achieve.achieved === dat._id);
        if (validUserSubscribe.length === 0) {
          this.submittedPayload.subscribedAchieves.push({achieved: dat._id, authorId: dat.author, isSubmittd: false});
          const dataPayload = {id: this.tokenPayload.subject, subscribedAchieves: this.submittedPayload.subscribedAchieves};
          this.userService.updateUser(dataPayload).subscribe(res => {
          });
        }
      }

    });
  }

  giveLukas(id) {

  }

}



