import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {AuthService} from '../../services/auth.service';
import { UserInfo } from 'src/app/models/user/user';
import { CommentInfo } from 'src/app/models/comment/comments';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { PostInfo } from 'src/app/models/post/post';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  title = 'app-material2';

  form: FormGroup;


  commentInfos: CommentInfo[] = [];
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

  getComment() {
    this._api.getTypeRequestComment('/comments').subscribe((commentInfos: CommentInfo[]) => {
      this.commentInfos = commentInfos.map((commentInfo: CommentInfo) => {
        return commentInfo;
      }).sort();

    });
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
    this._api.postTypeRequestComment('/comment/post', b).subscribe((postInfos: PostInfo) => {
      this.postInfos = postInfos.comment;
      if (postInfos) {
        this._auth.setDataInLocalStorage('token', postInfos);
      }
      }, err => {
        console.log(err);
      }
    );
  }

}