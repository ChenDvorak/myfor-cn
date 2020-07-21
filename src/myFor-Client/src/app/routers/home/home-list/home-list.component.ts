import { Component, OnInit } from '@angular/core';
import { BlogItem } from '../../../components/blogs/blog.models';
import { BlogService } from '../../../components/blogs/blog.service';
import { Result, Paginator, CommonService } from '../../../shared/services/common';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.sass']
})
export class HomeListComponent implements OnInit {

  isLoading = true;
  unfoldable = false;
  index = 1;
  totalPages = 1;
  blogList: BlogItem[] = [];
  constructor(
    private blog: BlogService,
    private common: CommonService
  ) { }

  ngOnInit(): void {
    this.index = 1;
    this.getBlogList();
  }

  private getBlogList() {
    this.blog.getBlogsByHomePage(this.index, 15).subscribe(r => {
      if (r.status === 200) {
        const pager = r.data as Paginator<BlogItem>;
        this.index = pager.index;
        this.totalPages = pager.totalPages;
        this.unfoldable = this.index < this.totalPages;
        this.blogList.push(...pager.list);
      } else {
        this.common.snackOpen(r.data as unknown as string);
      }
      this.isLoading = false;
    });
  }

  unfold() {
    if (this.index >= this.totalPages) {
      return;
    }
    this.index++;
    this.getBlogList();
  }
}
