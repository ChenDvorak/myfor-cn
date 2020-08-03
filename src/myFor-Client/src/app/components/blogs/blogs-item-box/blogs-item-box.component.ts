import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../../../shared/services/common';
import { Identity } from '../../../global';
import { BlogItem } from '../../../components/blogs/blog.models';
import { BlogService } from '../blog.service';
import { PostCommentBoxComponent } from '../post-comment-box/post-comment-box.component';
import { PostBlogBoxComponent } from '../post-blog-box/post-blog-box.component';
import { timer } from 'rxjs';

@Component({
  selector: 'app-blogs-item-box',
  templateUrl: './blogs-item-box.component.html',
  styleUrls: ['./blogs-item-box.component.sass']
})
export class BlogsItemBoxComponent implements OnInit {

  @Input() blog: BlogItem = {
    code: '',
    authorName: '',
    authorAccount: '',
    avatar: 'assets/images/no-avatar.jpg',
    title: ' ',
    postedTime: '',
    content: ``,
    isFull: true,
    commentCount: 0,
    agreeCount: 0,
    referenceCount: 0,
    thinkCount: 0,
    thoughtFrom: { key: '', value: '' },
    referenceFrom: { key: '', value: '' },
    agreed: false
  };
  agreeDisable = false;

  constructor(
    private router: Router,
    private dia: MatDialog,
    private identity: Identity,
    private common: CommonService,
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
  }

  toDetail(code: string) {
    this.router.navigate(['/b', code]);
  }

  potsComment() {
    this.dia.open(PostCommentBoxComponent, {
      panelClass: 'diaclass',
      data: {
        code: this.blog.code,
        title: this.blog.title
      }
    });
  }

  agree() {
    if (this.agreeDisable) {
      return;
    }

    const T = timer(0, 1000).subscribe(t => {
      this.agreeDisable = true;
      if (t >= 1) {
        T.unsubscribe();
        this.agreeDisable = false;
      }
    });

    this.blogService.agrees(this.blog.code).subscribe(r => {
      if (r.status === 200) {
        this.blog.agreed = !this.blog.agreed;
        this.blog.agreed ? this.blog.agreeCount++ : this.blog.agreeCount--;
      } else {
        this.common.snackOpen(r.data as string);
      }
    });
  }

  reference() {
    if (!this.checkLoggedIn()) {
      return;
    }
    this.dia.open(PostBlogBoxComponent, {
      panelClass: 'diaclass',
      data: {
        referenceFrom: { code: this.blog.code, title: this.blog.title }
      }
    });
  }

  think() {
    if (!this.checkLoggedIn()) {
      return;
    }
    this.dia.open(PostBlogBoxComponent, {
      panelClass: 'diaclass',
      data: {
        thinkFrom: { code: this.blog.code, title: this.blog.title }
      }
    });
  }

  private checkLoggedIn(): boolean {
    if (!this.identity.isLoggedIn) {
      this.common.snackOpen('请先登录');
      this.router.navigateByUrl('login');
      return false;
    }
    return true;
  }
}
