import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Identity, IdentityInfo } from '../../../global';
import { PostBlogBoxComponent } from '../../../components/blogs/post-blog-box/post-blog-box.component';
import { GlobalService } from '../../../global';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})
export class IndexComponent implements OnInit, AfterContentChecked {

  isLoggedIn = false;
  loggedInInfo: IdentityInfo;

  isHomePage = true;
  constructor(
    private global: GlobalService,
    private route: ActivatedRoute,
    private dia: MatDialog,
    private identity: Identity
  ) { }

  ngOnInit(): void {
    this.global.setTitle(this.route.snapshot.data.title);
    this.isLoggedIn = this.identity.isLoggedIn;
    if (this.isLoggedIn) {
      this.loggedInInfo = this.identity.getIdentityInfo();
    }
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
