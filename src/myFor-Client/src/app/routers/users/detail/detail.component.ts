import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Identity } from '../../../global';
import { PostBlogBoxComponent } from '../../../components/blogs/post-blog-box/post-blog-box.component';
import { GlobalService } from '../../../global';
import { UsersService, UserDetail } from '../../../components/users/users.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.sass']
})
export class DetailComponent implements OnInit, AfterContentChecked {

  isLoggedIn = false;
  isHomePage = true;

  detail: UserDetail = {
    account: '',
    name: '',
    avatar: 'assets/images/no-avatar.jpg',
    introdution: '',
    createDate: ''
  };

  constructor(
    private route: ActivatedRoute,
    private dia: MatDialog,
    private identity: Identity,
    private global: GlobalService,
    private user: UsersService
  ) { }

  ngOnInit(): void {
    this.detail.account = this.route.snapshot.paramMap.get('account');
    this.global.setTitle(`@${this.detail.account}`);
    this.isLoggedIn = this.identity.isLoggedIn;

    this.user.getUserDetail(this.detail.account).subscribe(r => {
      if (r.status === 200) {
        this.detail = r.data as UserDetail;
      }
    });
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
