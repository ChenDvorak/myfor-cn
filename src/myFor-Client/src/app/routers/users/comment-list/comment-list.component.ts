import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from '../../../shared/delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.sass']
})
export class CommentListComponent implements OnInit {

  constructor(
    private dia: MatDialog
  ) { }

  ngOnInit(): void {
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
