import { Component, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { UserService} from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';


  public users;
  public username;
  public email;
  public password;
  public validpassword;
  postusers = [];
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService, 
    protected userserv: UserService, private router: Router) {}

  openModal(template) {
    this.modalRef = this.modalService.show(template);
  }

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
    this.modalRef.hide();
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
