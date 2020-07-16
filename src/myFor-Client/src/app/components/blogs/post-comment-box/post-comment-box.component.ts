import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommentService } from '../comment.service';
import { CommonService } from '../../../shared/services/common';

@Component({
  selector: 'app-post-comment-box',
  templateUrl: './post-comment-box.component.html',
  styleUrls: ['./post-comment-box.component.sass']
})
export class PostCommentBoxComponent implements OnInit {

  code = '';
  title = '';
  content = '';
  posting = false;
  constructor(
    private dialogRef: MatDialogRef<PostCommentBoxComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private comment: CommentService,
    private common: CommonService
  ) { }

  ngOnInit(): void {
    this.code = this.data?.code;
    this.title = this.data?.title;
  }

  post() {

    this.posting = true;
    this.comment.postComment(this.code, this.content).subscribe(r => {
      if (r.status === 201) {
        this.common.snackOpen('评论成功');
        this.dialogRef.close(this.content);
      } else {
        this.common.snackOpen(r.data);
      }
      this.posting = false;
    });
  }
}
