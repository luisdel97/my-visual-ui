import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  private REST_API_SERVER = 'https://vazul-register.herokuapp.com';
  private REST_API_COMMENT = 'https://vazul-comment.herokuapp.com';

  constructor(private httpClient: HttpClient) { }

  getTypeRequest(url: any) {
    return this.httpClient.get(this.REST_API_SERVER + url).pipe(map(res => {
      return res;
    }));
  }

  postTypeRequest(url: any, payload: any) {
    return this.httpClient.post(this.REST_API_SERVER + url, payload).pipe(map(res => {
      return res;
    }));
  }

  getTypeRequestComment(url: any) {
    return this.httpClient.get(this.REST_API_COMMENT + url).pipe(map(res => {
      return res;
    }));
  }

  postTypeRequestComment(url: any, payload: any) {
    return this.httpClient.post(this.REST_API_COMMENT + url, payload).pipe(map(res => {
      return res;
    }))
  }

  putTypeRequest(url: any, payload: any) {
    return this.httpClient.put(this.REST_API_COMMENT + url, payload).pipe(map(res => {
      return res;
    }));
  }
}
