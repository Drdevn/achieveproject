import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Router } from '@angular/router';

// import { UserFilterPipe } from '../user-filter.pipe';
import { IUser } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})
export class FrontPageComponent implements OnInit {
  constructor(private imgser: UserService) { }
    ngOnInit() {
    }

  }


