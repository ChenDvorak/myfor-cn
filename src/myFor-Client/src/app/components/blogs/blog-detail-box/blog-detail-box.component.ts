import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BlogService, BlogDetail } from '../../../components/blogs/blog.service';
import { PostCommentBoxComponent } from '../post-comment-box/post-comment-box.component';
import { PostBlogBoxComponent } from '../post-blog-box/post-blog-box.component';
import { CommonService } from '../../../shared/services/common';

@Component({
  selector: 'app-blog-detail-box',
  templateUrl: './blog-detail-box.component.html',
  styleUrls: ['./blog-detail-box.component.sass']
})
export class BlogDetailBoxComponent implements OnInit {

  /**
   * 评论后发出评论内容
   */
  @Output() commented: EventEmitter<string> = new EventEmitter<string>();

  @Input() blogDetail: BlogDetail = {
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
    thinkCount: 0
  };

  constructor(
    private route: ActivatedRoute,
    private dia: MatDialog,
    private common: CommonService,
    private blog: BlogService
  ) { }

  ngOnInit(): void {
    this.blogDetail.code = this.route.snapshot.paramMap.get('code');
  }

  potsComment() {
    const d = this.dia.open(PostCommentBoxComponent, {
      panelClass: 'diaclass',
      data: {
        code: this.blogDetail.code,
        title: this.blogDetail.title
      }
    });
    d.afterClosed().subscribe(r => {
      //  成功评论后，发出事件，发射评论内容
      if (r) {
        r = r as string;
        this.commented.emit(r);
      }
    });
  }

  agree() {
    this.blog.agrees(this.blogDetail.code).subscribe(r => {
      if (r.status === 200) {
        this.blogDetail.agreed = !this.blogDetail.agreed;
      } else {
        this.common.snackOpen(r.data as string);
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
