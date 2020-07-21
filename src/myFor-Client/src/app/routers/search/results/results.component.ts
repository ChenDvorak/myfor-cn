import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../global';
import { CommonService, Paginator } from '../../../shared/services/common';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Identity } from '../../../global';
import { BlogService } from '../../../components/blogs/blog.service';
import { BlogItem } from '../../../components/blogs/blog.models';
import { PostBlogBoxComponent } from '../../../components/blogs/post-blog-box/post-blog-box.component';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.sass']
})
export class ResultsComponent implements OnInit {

  unfoldable = true;
  isLoggedIn = false;
  isHomePage = true;
  s = '';
  index = 1;
  totalPages = 1;
  blogList: BlogItem[] = [];
  constructor(
    private global: GlobalService,
    private common: CommonService,
    private route: ActivatedRoute,
    private dia: MatDialog,
    private identity: Identity,
    private blog: BlogService,
  ) { }

  ngOnInit(): void {
    this.s = this.route.snapshot.paramMap.get('s');
    this.global.setTitle(this.s + ' 的搜索结果');
    this.isLoggedIn = this.identity.isLoggedIn;
    this.getBlogList();
  }

  postBlog() {
    this.dia.open(PostBlogBoxComponent, {
      panelClass: 'diaclass'
    });
  }

  private getBlogList() {
    this.blog.getBlogsBySearch(this.index, 15, this.s).subscribe(r => {
      if (r.status === 200) {
        const pager = r.data as Paginator<BlogItem>;
        this.index = pager.index;
        this.totalPages = pager.totalPages;
        this.unfoldable = this.index < this.totalPages;
        this.blogList.push(...pager.list);
      } else {
        this.common.snackOpen(r.data as unknown as string);
      }
    });
  }

  searchValue(value: string) {
    if (value !== this.s) {
      this.index = 1;
    }
    this.s = value;
  }

  goback() {
    history.back();
  }

  unfold() {
    if (this.index >= this.totalPages) {
      return;
    }
    this.index++;
    this.getBlogList();
  }
}
