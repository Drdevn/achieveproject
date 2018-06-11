import {Component, OnInit} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {UserService} from '../services/user.service';
import * as decode from 'jwt-decode';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  public userData = <any>{};
  public userIcon;
  public iconeList;
  public changeIcon = this.userIcon;
  public updcounter;
  public updurl;
  public userId;
  public groupname;
  public groupId;
  public getGroupId = <any>[];
  public valid = true;


  modalRef: BsModalRef;

  public token = localStorage.getItem('token');
  public tokenPayload = <any>{};

  constructor(private modalService: BsModalService, private userService: UserService) {
  }


  ngOnInit() {
    // Дістаємо базу аватарів СТАРТ
    this.userService.getIcons().subscribe(data => {
      this.iconeList = data;
    });
    // Дістаємо базу аватарів КІНЕЦЬ
    this.tokenPayload = decode(this.token);
    const userid = {id: this.tokenPayload.subject};
    this.userService.getUser(userid).subscribe(data => {
      this.userData = data;
      this.userIcon = data.icon;
      this.changeIcon = this.userIcon;

      this.userData.groups.forEach(data => {

        if (data.author !== null) {
          this.valid = false;
        }

      });


    });
    const id = {id: this.tokenPayload.subject};


  }


  openModal(template) {
    this.modalRef = this.modalService.show(template);
  }

  setNewIcon() {
    this.userIcon = this.changeIcon;
    const userupd = {id: this.tokenPayload.subject, icon: this.userIcon};
    this.userService.updateUser(userupd).subscribe(res => {
    });
    this.modalRef.hide();

  }

  updateUser() {
    const userupd = {id: this.tokenPayload.subject, counter: this.updcounter, icon: this.updurl};
    this.userService.updateUser(userupd).subscribe(res => {
    });
  }

  addNewGroup() {
    const addGroupDet = {
      id: this.tokenPayload.subject,
      groups: [{name: this.groupname, author: this.tokenPayload.subject, id: this.getGroupId}]
    };
    const groupadd = {name: this.groupname, author: this.tokenPayload.subject,};

    // console.log(this.tokenPayload.subject);

    this.userService.updateUser(addGroupDet).subscribe(res => {
    });
    this.userService.registerGroup(groupadd).subscribe(res => {
    });
    // console.log(this.getGroupsId());


    const pushIdToUser = this.getGroupId._id;
    this.getGrouoId();
    this.modalRef.hide();
  }

  getGrouoId() {
    const id = {id: this.tokenPayload.subject};
    const result = <any>[];
    const userId = this.tokenPayload.subject;
    this.userService.getGroupByAuthor(id).subscribe(res => {
      this.groupId = res;
      this.groupId.forEach(function (group) {
        if (group.author === userId) {
          result.push(group);

        }
      });
      this.userId = (result[0]._id);

      const groupIdForAdmin = {
        id: this.tokenPayload.subject,
        groups: [{name: this.groupname, author: this.tokenPayload.subject, id: result[0]._id}]
      };

      console.log(result[0]._id);
      this.userService.updateUser(groupIdForAdmin).subscribe(res => {
      });
      // console.log(this.userId);
    });
  }

  // addGroupId(groupId) {
  //   const groupAddId = {id: groupId};
  //   this.userService.registerGroup(groupAddId).subscribe(res => {
  //   });
  //   console.log(groupId);
  // }


}

