import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from '../../../shared/delete-confirm-dialog/delete-confirm-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '../../../components/blogs/comment.service';
import { Identity } from '../../../global';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.sass']
})
export class CommentListComponent implements OnInit {

  isSeft = false;
  account = '';
  index = 1;
  comments: Comment[] = [];
  unfoldable = false;

  constructor(
    private dia: MatDialog,
    private route: ActivatedRoute,
    private identity: Identity
  ) { }

  ngOnInit(): void {
    this.account = this.route.snapshot.paramMap.get('account');
    this.isSeft = this.identity.isAccountLoggedIn(this.account);
  }

  deleteComment(commentId: number) {
    const D = this.dia.open(DeleteConfirmDialogComponent);
    D.afterClosed().subscribe(isDelete => {
      console.log(isDelete);
    });
  }

  getMore() {

  }
}
