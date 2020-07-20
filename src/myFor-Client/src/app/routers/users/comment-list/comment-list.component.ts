import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from '../../../shared/delete-confirm-dialog/delete-confirm-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '../../../components/blogs/comment.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.sass']
})
export class CommentListComponent implements OnInit {

  account = '';
  index = 1;
  comments: Comment[] = [];

  constructor(
    private dia: MatDialog,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.account = this.route.snapshot.paramMap.get('account');
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
