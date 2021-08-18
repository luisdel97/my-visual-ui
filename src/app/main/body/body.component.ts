import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {AuthService} from '../../services/auth.service';
import { UserInfo } from 'src/app/models/user/user';
import { CommentInfo } from 'src/app/models/comment/comments';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PostInfo } from 'src/app/models/post/post';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  title = 'app-material2';

  form: FormGroup;


  commentInfos: any = [];
  postInfos: string = '';

  constructor(
    private _api : ApiService,
    private _auth: AuthService,
    private fb: FormBuilder,
  ) {

    this.form = this.fb.group({
      comment: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getComment();
  }

  // getComment() {
  //   this._api.getTypeRequestComment('/comments').subscribe((commentInfos: CommentInfo[]) => {
  //     this.commentInfos = commentInfos.map((commentInfo: CommentInfo) => {
  //       return commentInfo;
  //     });

  //   });
  // }

  getComment() {
    return this._api.getTypeRequestComment('/comments').subscribe((data: {}) => {
      this.commentInfos = data;
    })

  }
  
  get f() {
    return this.form.controls;
  }

  submit() {
     this.onSbmit();
    this.refresh();
  }

  refresh(): void {
    window.location.reload();
}

onSbmit() {
  const b = this.form.value;
  console.log(b);
  this._api.postTypeRequestComment('/comment/post', b).subscribe(() => {
    this.postInfos;
    if (this.postInfos) {
      this._auth.setDataInLocalStorage('token', this.postInfos);
    }
    }, err => {
      console.log(err);
    }
  );
}

}