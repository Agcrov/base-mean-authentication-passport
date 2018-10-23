import { Component, OnInit } from '@angular/core';
import {faReply, faEdit, faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp, faTrashAlt } from "@fortawesome/free-regular-svg-icons"
import {CommentsService} from "../comments.service";
import {Comment} from "../comment";
import * as moment from 'moment';
import {AuthService} from "../auth.service";
import {User} from "../user";
import {Reply} from "../reply";


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  comments: Comment[];
  userComment = new  Comment();
  userReply = new Reply();
  userLogged: boolean;
  currentUser = new User();
  repliesInputs = {};

  faPaperPlane =faPaperPlane;
  faReply = faReply;
  faEdit = faEdit;
  faThumbsUp = faThumbsUp;
  faTrashAlt = faTrashAlt;

  constructor(private commentsService: CommentsService, private authService: AuthService) {
    this.userLogged = this.authService.validateToken;
    if (this.userLogged){
      let user = localStorage.getItem('user');
      this.currentUser = JSON.parse(user) as User;
    }
  }

  ngOnInit() {
    this.authService.isLoggedIn.subscribe( res =>{
      this.userLogged = res;
      if (this.userLogged){
        let user = localStorage.getItem('user');
        this.currentUser = JSON.parse(user) as User;
      }
    });
    this.commentsService.getComments().subscribe(res =>{
      this.comments = res.comments;
    });
  }
  onCommentSubmit(){
    if (this.userLogged){
      this.userComment.author = this.currentUser;
      if (this.userComment.author && this.userComment.content){
        this.commentsService.addComment(this.userComment).subscribe(res=>{
          if(res.success){
            //  reload the comments
            this.commentsService.getComments().subscribe( res => {
              this.comments = res.comments;
            });
          }
        });
      }
    } else console.log('Log in please');
  }
  onReplySubmit(comment: Comment){
    console.log('entra');
    if (this.userLogged){
      console.log('user logged');
      console.log(this.userReply);
      this.userReply.author = this.currentUser;
      if (this.userReply.author && this.userReply.content){
        this.commentsService.addReply(this.userReply, comment).subscribe(res=>{
          if(res.success){
            //  reload the comments
            this.commentsService.getComments().subscribe( res => {
              this.comments = res.comments;
            });
          }
        });
      }
    } else console.log('Log in please');
  }
  getTimeFromNow(date: string): string {
    let commentDate = moment(date);
    let time = commentDate.fromNow();
    if (time.indexOf('day')!=-1) {
        return commentDate.format('DD-MM-YYYY');
    }else {
      return time;
    }
    // let time = commentDate.diff(moment.now(),'hours');
    // if (-time >= 24 ){
    //   return commentDate.format('DD-MM-YYYY');
    // } else {
    //   return commentDate.fromNow();
    // }
    // // let time = commentDate.diff(moment.now(),'hours');
    // if (-time >= 24 ){
    //   return commentDate.format('DD-MM-YYYY');
    // } else {
    //   return commentDate.fromNow();
    // }
  }
}
