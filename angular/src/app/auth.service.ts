import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }


  register(user: User){
    if (user.validateUser()&&user.validateEmail()){

    }
  }
  authenticate(){

  }
}
