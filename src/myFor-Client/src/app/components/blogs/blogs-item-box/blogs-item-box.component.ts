import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BlogService, BlogItem } from '../blog.service';
import { PostCommentBoxComponent } from '../post-comment-box/post-comment-box.component';

@Component({
  selector: 'app-blogs-item-box',
  templateUrl: './blogs-item-box.component.html',
  styleUrls: ['./blogs-item-box.component.sass']
})
export class BlogsItemBoxComponent implements OnInit {

  @Input() blog: BlogItem = {
    code: '1231e',
    authorName: 'myfor',
    authorAccount: 'myfor_chen',
    avatar: 'assets/images/no-avatar.jpg',
    title: '论啥啥啥 ',
    postedTime: '2020-01-01',
    content: `<a href="/b/1231e" name="a-1231e">对《论哈哈哈》的见解</a>
    哈哈哈哈哈哈哈 哈哈哈哈哈哈哈 <a href="/b/1231e" name="a-1231e">引《论哈哈哈》</a>
    哈哈哈哈哈哈哈 content content content 哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈 content `,
    isFull: true,
    commentCount: 10_000,
    agreeCount: 11_000,
    referenceCount: 30_000,
    thinkCount: 10
  };

  constructor(
    private router: Router,
    private dia: MatDialog
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
}
