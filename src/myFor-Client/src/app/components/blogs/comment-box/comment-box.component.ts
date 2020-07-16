import { Component, OnInit, Input } from '@angular/core';
import { Comment, CommentService } from '../comment.service';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.sass']
})
export class CommentBoxComponent implements OnInit {

  @Input() model: Comment = {
    id: 0,
    authorName: '',
    authorAccount: '',
    avatar: '',
    dateTime: '',
    content: '',
    agreeCount: 0
  };
  constructor(
    private comment: CommentService
  ) { }

  ngOnInit(): void {
  }

}
