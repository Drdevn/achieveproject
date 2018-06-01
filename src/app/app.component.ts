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
  public updcounter;
  public updurl;
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService, 
    protected userserv: UserService, private router: Router) {}

  openModal(template) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit() {

    
  }
  

  cleaner(){
    this.username = "";
    this.password = "";
    this.email = "";
    this.validpassword = "";
  }

  registerUser(){
    let userdata;
    userdata = { username: this.username,
       email: this.email,
       password: this.password, counter: "0", icon:"boy_1.svg" }
    this.userserv.registerUser(userdata)
    .subscribe(
      res => {
        console.log(res)
        localStorage.setItem('token', res.token)
      },  
      err => console.log(err)
    )
    this.modalRef.hide();
    this.cleaner();
  }
 
  loginUser(){
    let loginData;
    loginData = { email: this.email, password: this.password}
    this.userserv.loginUser(loginData)
    .subscribe(
      res =>{ 
      console.log(res)
      localStorage.setItem('token', res.token)
      this.router.navigate(['/userpage'])      
    },
      err => console.log(err)
    )
    this.modalRef.hide();
    this.cleaner();
  }

updateIt(){
  let userupd = {counter: this.updcounter, icon: this.updurl}
  console.log(userupd)
  this.userserv.updateUser(userupd).subscribe(res =>{})
}

}
