import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { UserService } from '../services/user.service';
import * as decode from 'jwt-decode'

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  public userIcon = "boy_1.svg";
  public iconeList;
  public changeIcon = this.userIcon;
  public updcounter;
  public updurl;
  modalRef: BsModalRef;

  constructor( private modalService: BsModalService, private userService: UserService ) { }



  ngOnInit() {
    this.userService.getIcons().subscribe(data =>{
      this.iconeList = data;
      console.log(this.iconeList[0].name);
    });

  }

  openModal(template) {
    this.modalRef = this.modalService.show(template);
  }
  
  setNewIcon(){
    this.userIcon = this.changeIcon;
    this.modalRef.hide();

  }
  getUserId(){
    let token = localStorage.getItem('token')
    let tokenPayload = decode(token);
   let userupd = {counter: this.updcounter, icon: this.updurl}
   this.userService.updateUser(tokenPayload).subscribe(res =>{})
   console.log(tokenPayload);

  }
  updateIt(){
    let userupd = {counter: this.updcounter, icon: this.updurl}
    console.log(userupd)
    this.userService.updateUser(userupd).subscribe(res =>{})
  }
  
}
