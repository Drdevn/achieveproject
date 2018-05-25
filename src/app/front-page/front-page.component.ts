import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService} from '../services/user.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Router } from '@angular/router';

// import { UserFilterPipe } from '../user-filter.pipe';
import { IUser } from '../models/user';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})
export class FrontPageComponent implements OnInit {
  public users;
  public username;
  public email;
  public password;
  public validpassword;
  postusers = [];
  constructor(protected userserv: UserService, private router: Router) { }

  ngOnInit() {

    this.userserv.getUsers().subscribe(data=>{
      this.users = data;
    })
  }
  postreqverif(){
   let userdata;
   if(this.password == this.validpassword){
    userdata = { username: this.username, email: this.email, password: this.password, counter: "0" }
    this.userserv.addUser(userdata, '/add').subscribe(res =>{});
    this.cleaner();
    console.log(userdata);
    }
    else{
      alert("Your password don`t match");
      this.cleaner();
    }

  }

  cleaner(){
    this.username = "";
    this.password = "";
    this.email = "";
    this.validpassword = "";
  }
}
