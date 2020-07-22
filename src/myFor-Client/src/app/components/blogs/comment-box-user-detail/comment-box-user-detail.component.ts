import { Component, OnInit, Input } from '@angular/core';
import { CommentInUserDetail } from '../../../components/blogs/comment.model';

/**
 * 用户详情页下的评论列表
 */
@Component({
  selector: 'app-comment-box-user-detail',
  templateUrl: './comment-box-user-detail.component.html',
  styleUrls: ['./comment-box-user-detail.component.sass']
})
export class CommentBoxUserDetailComponent implements OnInit {

  @Input() model: CommentInUserDetail = {
    id: 0,
    blogCode: '',
    blogTitle: '',
    dateTime: '',
    content: '',
    agreeCount: 0
  };
  constructor(
  ) { }

  ngOnInit(): void {
  }

}
