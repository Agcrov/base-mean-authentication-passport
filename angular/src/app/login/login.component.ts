import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

import {AuthService} from "../auth.service";
import {User} from "../user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = new User();

  constructor( private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  onLogin(): void{
    if (this.user.validateEmail() && this.user.password !== undefined){
      this.authService.authenticate(this.user.email,this.user.password).subscribe(res =>{
        this.router.navigate(['/home']);
        console.log('after response ');
      });


    }
  }
}
