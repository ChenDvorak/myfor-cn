import { Component, OnInit, AfterContentChecked, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Identity } from '../../../global';
import { PostBlogBoxComponent } from '../../../components/blogs/post-blog-box/post-blog-box.component';
import { GlobalService } from '../../../global';
import { UsersService, UserDetail } from '../../../components/users/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.sass']
})
export class DetailComponent implements OnInit, AfterContentChecked, OnDestroy {

  isLoggedIn = false;
  isHomePage = true;
  /**
   * 用户是否存在
   */
  userExist = false;

  detail: UserDetail = {
    account: '',
    name: '',
    email: '',
    avatar: 'api/files/default.png',
    introduction: '',
    createDate: ''
  };
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private dia: MatDialog,
    private identity: Identity,
    private global: GlobalService,
    private user: UsersService
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe(p => {
      this.detail.account = p.get('account');
      this.global.setTitle(`@${this.detail.account}`);
      this.isLoggedIn = this.identity.isLoggedIn;

      this.user.getUserDetail(this.detail.account).subscribe(r => {
        this.userExist = r.status === 200;
        this.detail = r.data as UserDetail;
      });
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
