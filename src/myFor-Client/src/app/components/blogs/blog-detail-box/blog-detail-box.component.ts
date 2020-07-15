import { Component, OnInit, Input } from '@angular/core';
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

  code = '';
  @Input() blogDetail: BlogDetail = {
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
    thinkCount: 0
  };

  constructor(
    private route: ActivatedRoute,
    private dia: MatDialog
  ) { }

  ngOnInit(): void {
    this.code = this.route.snapshot.paramMap.get('code');
  }

  potsComment() {
    this.dia.open(PostCommentBoxComponent, {
      panelClass: 'diaclass',
      data: {
        code: this.code,
        title: this.blogDetail.title
      }
    });
  }

  reference() {
    this.dia.open(PostBlogBoxComponent, {
      panelClass: 'diaclass',
      data: {
        referenceFrom: { code: this.code, title: this.blogDetail.title }
      }
    });
  }

  think() {
    this.dia.open(PostBlogBoxComponent, {
      panelClass: 'diaclass',
      data: {
        thinkFrom: { code: this.code, title: this.blogDetail.title }
      }
    });
  }
}
