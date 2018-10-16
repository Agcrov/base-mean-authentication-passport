import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {User} from './user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

interface RegisterResponse {
  success: boolean,
  message: string,
  user: User;
}
interface AuthenticateResponse {
  success: boolean,
  token: string,
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:8080/users/';
  private authToken: any;
  private user: User;
  constructor(private httpService: HttpClient) { }

  register(user: User): Observable<RegisterResponse>{
    if (user.validateUser() && user.validateEmail()) {
      return this.httpService.post<RegisterResponse>(this.url + `register`,user, httpOptions );
    } else {
      ///TODO: return some error handler
      console.log('User validation failed at registration process.');
    }
  }
  authenticate(email: string, password: string): Observable<AuthenticateResponse>{
    return this.httpService.post<AuthenticateResponse>(this.url + `authenticate`,{email: email, password: password},httpOptions).pipe(
      tap(res => {
        if (res.success)  {
        localStorage.setItem('id_token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.authToken = res.token;
        this.user = res.user;
        } else {
          console.log(res);
        }
      })
    );
  }

  logOut(): void{
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  getLocalToken(): void {
    const token = localStorage.getItem('id_token');
    if (token) {
      console.log(token);
      this.authToken = token;
    } else {
      this.authToken = undefined;
    }
  }
  // private handleError<T> (operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //
  //     // TODO: send the error to remote logging infrastructure
  //     console.error(error); // log to console instead
  //
  //     // TODO: better job of transforming error for user consumption
  //
  //     // send this to backend (`${operation} failed: ${error.message}`);
  //
  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   };
  // }
}
