import {userError} from "@angular/compiler-cli/src/transformers/util";

export class User {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;

  constructor() {
    this.id = undefined;
    this.name = undefined;
    this.password = undefined;
    this.username = undefined;
    this.email = undefined;
  }

  validateUser(): boolean {
    return !(this.email == undefined || this.password == undefined || this.name == undefined || this.username == undefined );
  }

  validateEmail(): boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(this.email);
  }
}
