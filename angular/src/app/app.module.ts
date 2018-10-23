import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {AutosizeModule} from "./autosize/autosize.module";

import { MqIfDirective } from './mq-if.directive';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { CommentsComponent } from './comments/comments.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    MqIfDirective,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    CommentsComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FlashMessagesModule.forRoot(),
    AutosizeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
