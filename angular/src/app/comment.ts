import {Reply} from "./reply";
import {User} from "./user";


export class Comment {
  _id: string;
  author: User;
  content: string;
  likes: string[];
  replies: Reply[];
  createdAt: string;
  updatedAt: string;

  constructor() {
    this._id = undefined;
    this.author = undefined;
    this.content = undefined;
    this.likes = undefined;
    this.replies = undefined;
  }

  validateContent(): boolean {
    return this.content.length <= 250;
  }
}

