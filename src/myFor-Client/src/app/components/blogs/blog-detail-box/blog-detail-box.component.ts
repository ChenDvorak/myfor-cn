import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService, BlogDetail } from '../../../components/blogs/blog.service';

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
    commentCount: 0,
    agreeCount: 0,
    agreed: false,
    referenceCount: 0,
    thinkCount: 0
  };

  constructor(
    private route: ActivatedRoute,
    private blog: BlogService
  ) { }

  ngOnInit(): void {
    this.code = this.route.snapshot.paramMap.get('code');
  }

}
