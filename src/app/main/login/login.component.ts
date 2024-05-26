import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: UntypedFormGroup;
  constructor(
    private _api : ApiService,
    private _auth: AuthService,
    private router: Router,
    public fb: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    });

  }

  login() {
    const b = this.form.value;
    console.log(b);
    this._api.postTypeRequest('/login', b).subscribe((res: any) => {
      console.log(res);
      if (res.token) {
        this._auth.setDataInLocalStorage('token', res.token);
        this.router.navigate(['/profile']);

      }
    }, err => {
      console.log(err);
    });
  }


}