import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../components/users/users.service';
import { BlogItem } from '../../../components/blogs/blog.models';
import { BlogService } from '../../../components/blogs/blog.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from '../../../shared/delete-confirm-dialog/delete-confirm-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { Identity } from '../../../global';
import { Paginator } from '../../../shared/services/common';
import { CommonService } from '../../../shared/services/common';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.sass']
})
export class BlogListComponent implements OnInit {

  isSeft = false;
  account = '';
  index = 0;
  unfoldable = false;
  blogList: BlogItem[] = [];

  constructor(
    private dia: MatDialog,
    private route: ActivatedRoute,
    private identity: Identity,
    private user: UsersService,
    private blog: BlogService,
    private common: CommonService
  ) { }

  ngOnInit(): void {
    this.account = this.route.snapshot.paramMap.get('account');
    this.isSeft = this.identity.isAccountLoggedIn(this.account);
    this.getBlogsList();
  }

  getBlogsList() {
    this.user.getUserBlogs(this.index++, 10, this.account).subscribe(r => {
      if (r.status === 200) {
        const d = r.data as Paginator<BlogItem>;
        this.blogList.push(...d.list);
        this.unfoldable = d.index < d.totalPages;
      }
    });
  }

  deletePost(code: string) {
    if (!this.isSeft) {
      return;
    }
    const D = this.dia.open(DeleteConfirmDialogComponent, {
      data: this.getTitle(code)
    });
    D.afterClosed().subscribe((isDelete: boolean) => {
      if (isDelete) {
        this.blog.deleteBlog(code).subscribe(r => {
          if (r.status === 200) {
            this.common.snackOpen('删除成功');
            this.blogList = this.blogList.filter(v => v.code !== code);
          } else {
            this.common.snackOpen(r.data as string);
          }
        });
      }
    });
  }

  getMore() {
    this.getBlogsList();
  }

  private getTitle(code: string): string {
    const list = this.blogList.filter(v => v.code === code);
    if (list.length > 0) {
      return list[0].title;
    }
    return '';
  }
}
