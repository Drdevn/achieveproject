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
  constructor(private userService: UserService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.userService.getGroup(param).subscribe(data => {
        this.groupData = data;

      });
    });
    this.tokenPayload = decode(this.token);
    this.submitCheck();
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
    this.submitCheck();
  }

  submitCheck() {
    const myid = {id: this.tokenPayload.subject};
    this.userService.getUser(myid).subscribe(data => {
      console.log(this.groupData);
      // console.log(data.groups)
      data.groups.forEach(group => {
        if (group.id === this.groupData._id) {
          this.subscribed = false;
          return false;
      } else {
          this.subscribed = true;

        }
      });


      // for (let i = 0; i < data.groups.length; i++) {
      //   if ( data.groups[i].id === this.groupData._id) {
      //     this.subscribed = false;
      //     return false;
      //   } else {
      //     this.subscribed = true;
      //   }
      // }
    });

  }

  groupUnsubscribe() {
    const datId = {id: this.tokenPayload.subject};
    this.userService.getUser(datId).subscribe(data => {
      this.userInfo = data.groups;
      console.log(this.userInfo);
      for (let i = 0; i < this.userInfo.length; i++) {
        if (this.userInfo[i].id === this.groupData._id) {
          this.userInfo.splice( i, 1);
        } else {
          console.log('tu pidar');
        }
      }
      const request = {id: this.tokenPayload.subject, groups: this.userInfo};
      this.userService.updateUser(request).subscribe(res => {
      });
    });
    this.submitCheck();

  }

}
