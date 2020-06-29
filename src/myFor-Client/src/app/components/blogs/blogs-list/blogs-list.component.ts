import { Component, OnInit } from '@angular/core';
import { BlogService, BlogItem } from '../blog.service';

@Component({
  selector: 'app-blogs-list',
  templateUrl: './blogs-list.component.html',
  styleUrls: ['./blogs-list.component.sass']
})
export class BlogsListComponent implements OnInit {

  blogList: BlogItem[] = [
    {
      code: '1231e',
      authorName: 'myfor',
      authorAccount: 'myfor_chen',
      avatar: 'assets/images/no-avatar.jpg',
      title: '论啥啥啥 ',
      postedTime: '2020-01-01',
      content: '哈哈哈哈哈哈哈 content content content content content content content content content content content content content content content',
      isFull: false,
      commentCount: '10k',
      agreeCount: '11k',
      referenceCount: '30k',
      thinkCount: '10'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
