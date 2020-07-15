import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Identity } from '../../../global';
import { PostBlogBoxComponent } from '../../../components/blogs/post-blog-box/post-blog-box.component';
import { GlobalService } from '../../../global';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.sass']
})
export class DetailComponent implements OnInit, AfterContentChecked {

  isLoggedIn = false;
  isHomePage = true;

  account = '';

  constructor(
    private route: ActivatedRoute,
    private dia: MatDialog,
    private identity: Identity,
    private global: GlobalService
  ) { }

  ngOnInit(): void {
    this.account = this.route.snapshot.paramMap.get('account');
    this.global.setTitle(`@${this.account}`);
    this.isLoggedIn = this.identity.isLoggedIn;
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
