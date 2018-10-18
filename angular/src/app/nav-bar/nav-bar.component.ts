import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {JwtHelperService} from "@auth0/angular-jwt";
const jwtHelper = new JwtHelperService();
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  isLoggedIn: boolean;
  constructor(private auth: AuthService) {
    //TODO: find a cleaner way to do this in order to solve the next todo item. I don't want to call the token and less use the jwthelper.
    let token = this.auth.localToken;
    if(token){
      this.isLoggedIn = !jwtHelper.isTokenExpired(token);
    }else {
      this.isLoggedIn = false;
    }
  }

  ngOnInit() {
    //TODO: find the way to always get isLoggedIn value, when you have a token stored and enter it doesn't get the value.
    //Subscribe don't get a value change if is the same as the previous value....
    this.auth.isLoggedIn.subscribe(res => {
      this.isLoggedIn = res;
    });
  }

  logout():void {
    this.auth.logOut();
    console.log('Local storage cleaned up');
  }

}
