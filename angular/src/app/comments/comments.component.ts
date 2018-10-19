import { Component, OnInit } from '@angular/core';
import {faReply, faHeart} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  faReply = faReply;
  faHeart = faHeart;

  constructor() { }

  ngOnInit() {
  }

}
