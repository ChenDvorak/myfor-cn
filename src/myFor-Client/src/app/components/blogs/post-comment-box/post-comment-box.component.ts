import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlogService } from '../blog.service';

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
    private blog: BlogService
  ) { }

  ngOnInit(): void {
    this.code = this.data?.code;
    this.title = this.data?.title;
  }

  post() {

  }
}
