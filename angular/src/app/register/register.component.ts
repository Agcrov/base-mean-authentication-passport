import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import { FlashMessagesService } from "angular2-flash-messages/module/flash-messages.service";
import {User} from "../user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user = new User();
  confirmationPassword: string;

  constructor( private authService: AuthService, private flashService: FlashMessagesService) {
    this.confirmationPassword = null;
  }

  ngOnInit() {
  }

  checkPassword(): boolean {
    return this.user.password === this.confirmationPassword;
  }
  onRegisterSubmit() {
   this.flashService.grayOut(true);
    if (this.user.validateUser()){
     if (this.user.validateEmail()){
       if(this.checkPassword()){
        this.flashService.show('Success! Welcome', { cssClass: 'flash-minimal-success' , timeout: 3000 });
       }else {
         this.flashService.show("Error! Passwords doesn't match, please make sure to confirm your password.", { cssClass: 'flash-minimal-error' , timeout: 3000 });
       }
     }else {
       this.flashService.show('Error! Please use a valid email address.', { cssClass: 'flash-minimal-error' , timeout: 3000 });

     }
    }else {
      this.flashService.show('Error! Please fill all the fields.', { cssClass: 'flash-minimal-error' , timeout: 3000 });
    }
  }

}
