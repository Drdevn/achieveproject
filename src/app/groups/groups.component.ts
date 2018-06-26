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

  public userInfo;
  public groupsListUpdate = [];

  constructor(private userService: UserService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(param => {
      console.log(param);
      this.userService.getGroup(param).subscribe(data => {
        console.log(data);
        this.groupData = data;

      });
    });

    this.tokenPayload = decode(this.token);


  }

  groupSubscribe() {
    const datId = {id: this.tokenPayload.subject}
    this.userService.getUser(datId).subscribe(data => {
      this.userInfo = data;
      this.groupsListUpdate = this.userInfo.groups;
      console.log('data', data);
      console.log(this.userInfo);
      console.log('rwerew');
      this.groupsListUpdate.push({name: this.groupData.name, author: this.groupData.author, id: this.groupData._id});
      console.log(this.groupsListUpdate);
      const request = {id: this.tokenPayload.subject, groups: this.groupsListUpdate};
      this.userService.updateUser(request).subscribe(res => {
      });
    });

    console.log(this.userInfo);

  }


}
