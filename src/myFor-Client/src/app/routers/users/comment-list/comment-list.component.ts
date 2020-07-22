import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from '../../../shared/delete-confirm-dialog/delete-confirm-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { CommentInUserDetail } from '../../../components/blogs/comment.model';
import { Identity } from '../../../global';
import { CommonService, Paginator } from '../../../shared/services/common';
import { UsersService } from '../../../components/users/users.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.sass']
})
export class CommentListComponent implements OnInit {

  isSeft = false;
  account = '';
  index = 0;
  comments: CommentInUserDetail[] = [];
  unfoldable = false;

  constructor(
    private dia: MatDialog,
    private route: ActivatedRoute,
    private identity: Identity,
    private users: UsersService,
    private common: CommonService
  ) { }

  ngOnInit(): void {
    this.account = this.route.snapshot.paramMap.get('account');
    this.isSeft = this.identity.isAccountLoggedIn(this.account);
    this.getComments();
  }

  getComments() {
    this.users.getUserComments(++this.index, 10, this.account, '').subscribe(r => {
      if (r.status === 200) {
        const d = r.data as Paginator<CommentInUserDetail>;
        this.unfoldable = d.index < d.totalPages;
        this.comments.push(...d.list);
      } else {
        this.common.snackOpen(r.data as string);
      }
    });
  }

  deleteComment(commentId: number) {
    const D = this.dia.open(DeleteConfirmDialogComponent);
    D.afterClosed().subscribe(isDelete => {
      console.log(isDelete);
    });
  }

  getMore() {
    if (this.unfoldable) {
      this.getComments();
    }
  }
}
