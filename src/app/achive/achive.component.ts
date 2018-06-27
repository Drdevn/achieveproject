import {Component, OnInit, Input} from '@angular/core';
import {UserService} from '../services/user.service';


@Component({
  selector: 'app-achive',
  templateUrl: './achive.component.html',
  styleUrls: ['./achive.component.css']
})
export class AchiveComponent implements OnInit {
  @Input() groupId: string;
  public achname;
  public achcontent;
  public achreward = '+ Respect';
  public value;
  public getAchieve;
  public lukas = 0;

  constructor(private userserv: UserService) {
  }

  ngOnInit() {
  this.userserv.getAchieve().subscribe(data => { this.getAchieve = data; });
    console.log(localStorage.getItem('token'));
    console.log(this.groupId);
  }
  giveLukas(id) {
    this.lukas++;
    const mylukas = {id: id, likes: this.lukas};
    this.userserv.modifyAchieve(mylukas).subscribe(res => {
      });

  }
  getThoseModels() {
    const myobj = {name: this.achname, content: this.achcontent, reward: this.achreward, value: this.value};
    this.userserv.postAchieve(myobj).subscribe(res => {
    });
  }
}
