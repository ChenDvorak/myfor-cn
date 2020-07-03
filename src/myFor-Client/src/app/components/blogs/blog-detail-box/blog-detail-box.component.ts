import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BlogService, BlogDetail } from '../../../components/blogs/blog.service';
import { PostCommentBoxComponent } from '../post-comment-box/post-comment-box.component';
import { PostBlogBoxComponent } from '../post-blog-box/post-blog-box.component';

@Component({
  selector: 'app-blog-detail-box',
  templateUrl: './blog-detail-box.component.html',
  styleUrls: ['./blog-detail-box.component.sass']
})
export class BlogDetailBoxComponent implements OnInit {

  code = '1231e';
  blogDetail: BlogDetail = {
    code: this.code,
    authorName: 'myFor',
    authorAccount: 'myfor_chon',
    avatar: 'assets/images/no-avatar.jpg',
    title: '标题',
    postedTime: '2020-20-20',
    content: '内容',
    commentCount: 10000,
    agreeCount: 1000,
    agreed: false,
    referenceCount: 1000,
    thinkCount: 10
  };

  constructor(
    private route: ActivatedRoute,
    private blog: BlogService,
    private dia: MatDialog
  ) { }

  ngOnInit(): void {
    this.code = this.route.snapshot.paramMap.get('code');
  }

  potsComment() {
    this.dia.open(PostCommentBoxComponent, {
      panelClass: 'diaclass',
      data: {
        code: this.blogDetail.code,
        title: this.blogDetail.title
      }
    });
  }

  reference() {
    this.dia.open(PostBlogBoxComponent, {
      panelClass: 'diaclass',
      data: {
        referenceFrom: { code: this.blogDetail.code, title: this.blogDetail.title }
      }
    });
  }

  think() {
    this.dia.open(PostBlogBoxComponent, {
      panelClass: 'diaclass',
      data: {
        thinkFrom: { code: this.blogDetail.code, title: this.blogDetail.title }
      }
    });
  }
}
