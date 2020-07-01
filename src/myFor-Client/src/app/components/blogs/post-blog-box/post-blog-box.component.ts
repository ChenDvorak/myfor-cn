import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlogService, NewBlog, ReferenceFrom } from '../blog.service';

@Component({
  selector: 'app-post-blog-box',
  templateUrl: './post-blog-box.component.html',
  styleUrls: ['./post-blog-box.component.sass']
})
export class PostBlogBoxComponent implements OnInit {

  newBlog: NewBlog = {
    title: '',
    content: ''
  };
  /**
   * 对谁的见解
   */
  thinkFrom: ReferenceFrom;
  /**
   * 对谁的引用
   */
  referenceFrom: ReferenceFrom;

  constructor(
    private dialogRef: MatDialogRef<PostBlogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private blog: BlogService
  ) { }

  ngOnInit(): void {
    this.thinkFrom = this.data?.thinkFrom;
    this.referenceFrom = this.data?.referenceFrom;
    //  引用
    if (this.referenceFrom && this.referenceFrom.code && this.referenceFrom.title) {
      const referenceTarget = `<a href="/b/${this.referenceFrom.code}">${this.referenceFrom.title}</a><br>`;
      this.newBlog.content = referenceTarget + this.newBlog.content;
    }
    //  见解
    if (this.thinkFrom && this.thinkFrom.code && this.thinkFrom.title) {
      const thinkTarget = `<a href="/b/${this.thinkFrom.code}">${this.thinkFrom.title}</a><br>`;
      this.newBlog.content = thinkTarget + this.newBlog.content;
    }
  }

  post() {

  }

  close() {
    this.dialogRef.close();
  }
}
