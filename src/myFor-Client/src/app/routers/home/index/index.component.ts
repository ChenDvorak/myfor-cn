import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { CommonService } from '../../../shared/services/common';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PostBlogBoxComponent } from '../../../components/blogs/post-blog-box/post-blog-box.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})
export class IndexComponent implements OnInit, AfterContentChecked {

  isLoggedIn = false;
  isHomePage = true;
  constructor(
    private common: CommonService,
    private route: ActivatedRoute,
    private dia: MatDialog
  ) { }

  ngOnInit(): void {
    this.common.setTitle(this.route.snapshot.data.title);
  }

  ngAfterContentChecked(): void {
      this.isHomePage = location.pathname === '/';
  }

  postBlog() {
    this.dia.open(PostBlogBoxComponent, {
      panelClass: 'diaclass'
    });
  }

  goback() {
    history.back();
  }
}
