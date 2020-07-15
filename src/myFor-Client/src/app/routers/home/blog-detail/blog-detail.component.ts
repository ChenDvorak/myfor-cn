import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../shared/services/common';
import { ActivatedRoute } from '@angular/router';
import { BlogService, BlogDetail } from '../../../components/blogs/blog.service';
import { GlobalService } from '../../../global';

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
    thinkCount: 0
  };
  unfoldable = false;
  constructor(
    private route: ActivatedRoute,
    private blog: BlogService,
    private global: GlobalService
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

  private getComments() {}
}
