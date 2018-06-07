import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  public groupData = <any>{} ;

  constructor( private userService: UserService,
               private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe( param => {
      console.log(param);
       this.userService.getGroup(param).subscribe(data => {
         console.log(data);
       this.groupData = data;
       });
    });

  }

}
