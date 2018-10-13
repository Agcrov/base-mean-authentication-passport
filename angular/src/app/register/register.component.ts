import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";

import {User} from "../user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user = new User();
  confirmationPassword: string;

  constructor( private authService: AuthService) {
    this.confirmationPassword = null;
  }

  ngOnInit() {
  }

  checkPassword(): boolean {
    return this.user.password === this.confirmationPassword;
  }
  onRegisterSubmit() {
    if (this.user.validateUser() && this.user.validateEmail() && this.checkPassword()){
      console.log('todo en order');
    } else {
      console.log('something went wrong');
    }
  }

}
