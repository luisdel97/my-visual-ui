import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserInfo } from 'src/app/models/user/user';
import { CommentInfo } from 'src/app/models/comment/comments';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PostInfo } from 'src/app/models/post/post';
import { Observable } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  title = 'app-material2';

  form: UntypedFormGroup;


  commentInfos: any = [];
  postInfos: string = '';

  constructor(
    private _api : ApiService,
    private _auth: AuthService,
    private fb: UntypedFormBuilder,
  ) {

    this.form = this.fb.group({
      comment: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getComment();
  
  }

  getComment() {
    this._api.getTypeRequestComment('/comments').subscribe((commentInfos: CommentInfo[]) => {
      return this.commentInfos = commentInfos.sort((a, b) => {
        return <any>new Date (b.time) - <any>new Date (a.time)
       
      });
    })
  }
 
  get f() {
    return this.form.controls;
    
  }

  submit() {
     this.onSbmit();
      this.ngOnInit();
     this.resetTheForm();
  }

  resetTheForm(): void {
    this.form.reset();
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
    });
  }
}

