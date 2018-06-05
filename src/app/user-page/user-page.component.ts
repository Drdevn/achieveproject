import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { UserService } from '../services/user.service';
import * as decode from 'jwt-decode';
import { Subject } from 'rxjs';


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
  modalRef: BsModalRef;

  public token = localStorage.getItem('token');
  public tokenPayload = <any>{};

  constructor( private modalService: BsModalService, private userService: UserService ) { }



  ngOnInit() {
    // Дістаємо базу аватарів СТАРТ
    this.userService.getIcons().subscribe(data =>{
      this.iconeList = data;
      console.log(this.iconeList[0].name);
    });
    // Дістаємо базу аватарів КІНЕЦЬ
    this.tokenPayload = decode(this.token);
    let userid = {id:this.tokenPayload.subject}
    this.userService.getUser(userid).subscribe(data => {
      this.userData = data;
      this.userIcon = data.icon;
      this.changeIcon = this.userIcon;
    })

    console.log(this.userIcon);
  }

  openModal(template) {
    this.modalRef = this.modalService.show(template);
  }

  setNewIcon(){
    this.userIcon = this.changeIcon;
    let userupd = {id: this.tokenPayload.subject, counter: this.updcounter, icon: this.userIcon}
    this.userService.updateUser(userupd).subscribe(res =>{})
    this.modalRef.hide();

  }
  updateUser(){
    let userupd = {id: this.tokenPayload.subject, counter: this.updcounter, icon: this.updurl}
    this.userService.updateUser(userupd).subscribe(res =>{})
  }



}
