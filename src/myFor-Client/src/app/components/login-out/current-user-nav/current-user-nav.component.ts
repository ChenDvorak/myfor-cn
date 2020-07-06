import { Component, OnInit } from '@angular/core';
import { PostBlogBoxComponent } from '../../blogs/post-blog-box/post-blog-box.component';
import { MatDialog } from '@angular/material/dialog';
import { Identity, IdentityInfo } from '../../../global';

@Component({
  selector: 'app-current-user-nav',
  templateUrl: './current-user-nav.component.html',
  styleUrls: ['./current-user-nav.component.sass']
})
export class CurrentUserNavComponent implements OnInit {

  identityInfo: IdentityInfo;

  constructor(
    private dia: MatDialog,
    private identity: Identity
  ) { }

  ngOnInit(): void {
    this.identityInfo = this.identity.getIdentityInfo();
  }

  postBlog() {
    this.dia.open(PostBlogBoxComponent, {
      panelClass: 'diaclass'
    });
  }

  logout() {
    this.identity.clean();
    location.href = '/';
  }
}
