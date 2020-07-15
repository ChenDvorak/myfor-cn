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
    authorName: 'myfor',
    authorAccount: 'myfor_chen',
    avatar: 'assets/images/no-avatar.jpg',
    dateTime: '2020-01-01',
    content: 'eotuhoentuhoenuth\n<a href="/b/1231.">hhh</a>',
    agreeCount: 1000
  };
  constructor(
    private comment: CommentService
  ) { }

  ngOnInit(): void {
  }

}
