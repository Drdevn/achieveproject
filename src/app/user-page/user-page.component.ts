import {Component, OnInit} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {UserService} from '../services/user.service';
import * as decode from 'jwt-decode';
import {Router} from '@angular/router';


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
  public createdAchieves = [];
  public confirm = [];
  public userId;
  public groupname;
  public groupId;
  public getGroupId = <any>[];
  public valid = true;
  public achiveList;
  public achiveSubmittersId;
  public submitterAchiveList = [];
  public subscriberDetails;


  modalRef: BsModalRef;

  public token = localStorage.getItem('token');
  public tokenPayload = <any>{};

  constructor(private modalService: BsModalService, private userService: UserService, private router: Router) {
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
      this.userData.groups.forEach(dat => {
        if (dat.author !== null) {
          this.valid = false;
        }
      });
      this.achiveSubmittersId = data.submittedAchieves;
      console.log(this.achiveSubmittersId);
      // console.log(this.achiveSubmittersId)
      // ;
      // for (let i = 0; i < this.achiveSubmittersId.length; i++) {}
        // const datUserId = {id: this.achiveSubmittersId[i].userId};
        // console.log(datUserId);
        // this.userService.getUser(datUserId).subscribe(data => {
        //   this.subscriberDetails = data;
        //   console.log(this.subscriberDetails);
        //
        // });
      this.userService.getAchieve().subscribe( achi => {
        this.achiveList = achi;
        const checkAuthor = this.achiveList.filter(achieve => achieve.author === this.tokenPayload.subject);
        console.log( checkAuthor);
        this.submitterAchiveList = checkAuthor;
        // for (let i = 0; i < this.achiveSubmittersId.length; i++) {
          // const taha = this.achiveList.filter( achiveId => achiveId._id === this.achiveSubmittersId[i].achieveId );
          // console.log(taha);
          //
          // this.submitterAchiveList.push(taha[0]);

        // }
      });
    });
  }
  closeAchive(uid, achiva) {
    // console.log(uid.id);
    // console.log(achiva._id);
    const userId = {id: uid.id};
    this.userService.getUser(userId).subscribe(user => {
      // console.log(user);
      this.confirm = user.doneAchieves;
      this.confirm.push({doneAchieveId: achiva._id});//to put more info for dane achive
      const confirmUser = {id: uid.id, doneAchieves: this.confirm};
      this.userService.updateUser(confirmUser).subscribe( req => {});



      const i = achiva.users.indexOf(uid);
      console.log(i);
      achiva.users[i].isSubmited = true;
      const freshUsers = achiva.users;
      const achivUpdater = {id: achiva._id, users: freshUsers};
      this.userService.modifyAchieve(achivUpdater).subscribe(res => {});
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

  // updateUser() {
  //   const userupd = {id: this.tokenPayload.subject, counter: this.updcounter, icon: this.updurl};
  //   this.userService.updateUser(userupd).subscribe(res => {
  //   });
  // }

  addNewGroup() {
    const addGroupDet = {
      id: this.tokenPayload.subject,
      groups: [{name: this.groupname, author: this.tokenPayload.subject, id: this.getGroupId}]
    };
    const groupadd = {name: this.groupname, author: this.tokenPayload.subject};


    this.userService.updateUser(addGroupDet).subscribe(res => {
    });
    this.userService.registerGroup(groupadd).subscribe(res => {
    });


    const pushIdToUser = this.getGroupId._id;
    this.getDatGroupId();
    this.modalRef.hide();
    this.ngOnInit();
  }

  getDatGroupId() {
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
    });
  }

  groupNavigate(id) {
    this.router.navigate(['/groups/', id]);
  }

  confirmSubmit(uid){

  }

}

