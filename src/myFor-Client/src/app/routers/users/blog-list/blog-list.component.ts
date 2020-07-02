import { Component, OnInit } from '@angular/core';
import { BlogService, BlogItem } from '../../../components/blogs/blog.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from '../../../shared/delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.sass']
})
export class BlogListComponent implements OnInit {

  index = 1;
  blogList: BlogItem[] = [];

  constructor(
    private blog: BlogService,
    private dia: MatDialog
  ) { }

  ngOnInit(): void {
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
