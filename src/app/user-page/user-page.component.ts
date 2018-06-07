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
    });

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
    const groupadd = {name: this.groupname, author: this.tokenPayload.subject};
    const addGroupDet = {id: this.tokenPayload.subject, groups: [{name: this.groupname, author: this.tokenPayload.subject}]};
    const id = {id: this.tokenPayload.subject};
    console.log(this.tokenPayload.subject);
    this.userService.registerGroup(groupadd).subscribe(res => {
    });
    this.userService.updateUser(addGroupDet).subscribe(res => {
    });
    this.userService.getGroupByAuthor(id).subscribe(res => {
      this.groupId = res.id;  console.log(res);
    });

    this.modalRef.hide();
  }


}
