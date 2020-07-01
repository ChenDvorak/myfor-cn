import { Component, OnInit } from '@angular/core';
import { BlogService, BlogItem } from '../../../components/blogs/blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.sass']
})
export class BlogListComponent implements OnInit {

  index = 1;
  blogList: BlogItem[] = [];

  constructor(
    private blog: BlogService
  ) { }

  ngOnInit(): void {
  }

  getMore() {

  }
}
