import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../components/blogs/blog.service';
import { BlogItem } from '../../../components/blogs/blog.models';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from '../../../shared/delete-confirm-dialog/delete-confirm-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { Identity } from '../../../global';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.sass']
})
export class BlogListComponent implements OnInit {

  isSeft = false;
  account = '';
  index = 1;
  unfoldable = false;
  blogList: BlogItem[] = [];

  constructor(
    private blog: BlogService,
    private dia: MatDialog,
    private route: ActivatedRoute,
    private identity: Identity
  ) { }

  ngOnInit(): void {
    this.account = this.route.snapshot.paramMap.get('account');
    this.isSeft = this.identity.isAccountLoggedIn(this.account);
  }

  deletePost(blogId: number) {
    const D = this.dia.open(DeleteConfirmDialogComponent, {
      data: 'title'
    });
    D.afterClosed().subscribe(isDelete => {
      console.log(isDelete);
    });
  }

  getMore() {

  }
}
