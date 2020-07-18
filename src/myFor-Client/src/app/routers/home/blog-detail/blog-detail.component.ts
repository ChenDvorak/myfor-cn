import { Component, OnInit } from '@angular/core';
import { CommonService, Paginator } from '../../../shared/services/common';
import { ActivatedRoute } from '@angular/router';
import { BlogService, BlogDetail } from '../../../components/blogs/blog.service';
import { GlobalService, Identity } from '../../../global';
import { Comment, IntroComment, CommentService } from '../../../components/blogs/comment.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.sass']
})
export class BlogDetailComponent implements OnInit {

  loading = true;
  defaultMessage = null;
  detail: BlogDetail = {
    code: '',
    authorName: '',
    authorAccount: '',
    avatar: '',
    title: '',
    postedTime: '',
    content: '',
    commentCount: 0,
    agreeCount: 0,
    agreed: false,
    referenceCount: 0,
    thinkCount: 0,
    thoughtFrom: '',
    referenceFrom: ''
  };
  comments: Comment[] = [];
  /**
   * 刚添加的评论
   */
  newComments: IntroComment[] = [];
  /**
   * 是否可以展开更多评论
   */
  unfoldable = true;
  index = 0;

  constructor(
    private route: ActivatedRoute,
    private blog: BlogService,
    private global: GlobalService,
    private identity: Identity,
    private common: CommonService,
    private comment: CommentService
  ) { }

  ngOnInit(): void {
    this.detail.code = this.route.snapshot.paramMap.get('code');
    this.getBlogDetail();
    this.getComments();
  }

  private getBlogDetail() {
    this.blog.getBlog(this.detail.code).subscribe(r => {
      if (r.status === 200) {
        this.detail = r.data as BlogDetail;
        this.global.setTitle(this.detail.title);
      } else {
        this.defaultMessage = '获取失败';
      }
      this.loading = false;
    });
  }

  getComments() {
    this.index++;
    this.comment.getCommentsList(this.detail.code, this.index, 10).subscribe(r => {
      if (r.status === 200) {
        r.data = r.data as Paginator<Comment>;
        this.unfoldable = r.data.index < r.data.totalPages;
        this.comments.push(...r.data.list);
      } else {
        this.common.snackOpen(r.data as string);
      }
    });
  }

  /**
   * 展示新添加的评论
   * @param commentContent 评论内容
   */
  commented(commentContent: string) {
    if (!this.identity.isLoggedIn) {
      this.common.snackOpen('请先登录');
      return;
    }
    const newCommentIntro: IntroComment = {
      avatar: this.identity.getIdentityInfo().avatar,
      content: commentContent
    };
    this.newComments = [newCommentIntro, ...this.newComments];
  }
}
