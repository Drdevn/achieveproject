import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  public userIcon = "boy_1.svg";
  public iconeList;
  public changeIcon = this.userIcon;

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

}
