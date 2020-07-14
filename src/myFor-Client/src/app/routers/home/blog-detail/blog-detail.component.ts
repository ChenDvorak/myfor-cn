import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../shared/services/common';
import { ActivatedRoute } from '@angular/router';
import { BlogService, BlogDetail } from '../../../components/blogs/blog.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.sass']
})
export class BlogDetailComponent implements OnInit {

  defaultMessage = null;
  code = '';
  detail: BlogDetail = {
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
    private common: CommonService,
    private route: ActivatedRoute,
    private blog: BlogService
  ) { }

  ngOnInit(): void {
    this.code = this.route.snapshot.paramMap.get('code');
    this.getBlogDetail();
  }

  private getBlogDetail() {
    this.blog.getBlog(this.code).subscribe(r => {
      if (r.status === 200) {
        this.detail = r.data as BlogDetail;
        this.common.setTitle(this.code);
      } else {
        this.defaultMessage = '获取失败';
      }
    });
  }
}
