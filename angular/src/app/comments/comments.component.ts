import { Component, OnInit } from '@angular/core';
import {faReply, faHeart} from "@fortawesome/free-solid-svg-icons";
import {CommentsService} from "../comments.service";
import {Comment} from "../comment";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  comments: Comment[];
  faReply = faReply;
  faHeart = faHeart;

  constructor(private commentsService: CommentsService) { }

  ngOnInit() {
    this.commentsService.getComments().subscribe(res =>{
      console.log(res);
      this.comments = res.comments;
    })
  }

}
