import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../global';
import { CommonService } from '../../../shared/services/common';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Identity } from '../../../global';
import { PostBlogBoxComponent } from '../../../components/blogs/post-blog-box/post-blog-box.component';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.sass']
})
export class ResultsComponent implements OnInit {

  isLoggedIn = false;
  isHomePage = true;
  s = '';
  constructor(
    private global: GlobalService,
    private common: CommonService,
    private route: ActivatedRoute,
    private dia: MatDialog,
    private identity: Identity
  ) { }

  ngOnInit(): void {
    this.s = this.route.snapshot.paramMap.get('s');
    this.global.setTitle(this.s + ' 的搜索结果');
    this.isLoggedIn = this.identity.isLoggedIn;
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
