import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { UserInfo } from 'src/app/models/user/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userInfos: any = [];
  constructor(
    private _api : ApiService,
    private _auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this._api.getTypeRequest('/profile').subscribe((data: {}) => {
      this.userInfos = data;

    });
  }

  // getComment() {
  //   return this._api.getTypeRequestComment('/comments').subscribe((data: {}) => {
  //     this.commentInfos = data;
  //   })

  // }

}