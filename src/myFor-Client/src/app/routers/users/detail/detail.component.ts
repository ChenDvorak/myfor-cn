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
    avatar: 'api/files/default.png',
    introdution: '',
    createDate: ''
  };
  routeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private dia: MatDialog,
    private identity: Identity,
    private global: GlobalService,
    private user: UsersService
  ) { }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(p => {
      this.detail.account = p.get('account');
      this.global.setTitle(`@${this.detail.account}`);
      this.isLoggedIn = this.identity.isLoggedIn;

      this.user.getUserDetail(this.detail.account).subscribe(r => {
        if (r.status === 200) {
          this.userExist = true;
          this.detail = r.data as UserDetail;
        } else if (r.status === 410) {
          this.userExist = false;
          this.detail.account = `用户 ${this.detail.account} 不存在`;
          this.detail.avatar = 'api/files/default.png';
          this.detail.name = '';
          this.detail.introdution = '';
        }
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
