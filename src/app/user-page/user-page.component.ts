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
  public subscribedAchievesList = [];
  public confirm = [];
  public userId;
  public groupname;
  public groupId;
  public getGroupId = <any>[];
  public valid = true;
  public achiveList;
  public achiveSubmittersId;
  public submitterAchiveList = [];
  public doneAc;


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
      this.doneAc = data.doneAchieves.length;
      this.changeIcon = this.userIcon;
      this.userData.groups.forEach(dat => {
        if (dat.author !== null) {
          this.valid = false;
        }
      });
      this.userService.getAchieve().subscribe( achi => {
        this.achiveList = achi;
        const checkAuthor = this.achiveList.filter(achieve => achieve.author === this.tokenPayload.subject);
        console.log(checkAuthor);
        this.submitterAchiveList = checkAuthor;
        console.log(data.doneAchieves);

        //вивід ачівок на які питписаний користувач;
        for (let i = 0; i < data.subscribedAchieves.length; i++) {
          if (!data.subscribedAchieves[i].isSubmittd) {
            const subscribeAchives = this.achiveList.filter( achko => achko._id === data.subscribedAchieves[i].achieved );
            this.submitterAchiveList.push(subscribeAchives[0]);
          }
        }
        console.log(this.submitterAchiveList);

      });

    });
  }

  closeAchive(uid, achiva) {

    const userId = {id: uid.id};
    this.userService.getUser(userId).subscribe(user => {
      this.confirm = user.doneAchieves;
      const dateNow = new Date().toLocaleString();
      this.confirm.push({name: achiva.name, content: achiva.content, reward: achiva.reward, data: dateNow});
      const confirmUser = {id: uid.id, doneAchieves: this.confirm};
      this.userService.updateUser(confirmUser).subscribe(req => {
      });

      const test = achiva.users.indexOf(uid);
      console.log(test);


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



}

