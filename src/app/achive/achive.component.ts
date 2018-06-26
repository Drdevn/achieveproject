import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';


@Component({
  selector: 'app-achive',
  templateUrl: './achive.component.html',
  styleUrls: ['./achive.component.css']
})
export class AchiveComponent implements OnInit {

  public achname;
  public achcontent;
  public achreward = '+ Respect';

  constructor(private userserv: UserService) {
  }

  ngOnInit() {

  }

  getThoseModels() {
    const myobj = {name: this.achname, content: this.achcontent, reward: this.achreward};
    this.userserv.postAchieve(myobj).subscribe(res => {
    });
  }
}
