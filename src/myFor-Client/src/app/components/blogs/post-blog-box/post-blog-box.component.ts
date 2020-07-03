import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlogService, NewBlog, ReferenceFrom } from '../blog.service';

@Component({
  selector: 'app-post-blog-box',
  templateUrl: './post-blog-box.component.html',
  styleUrls: ['./post-blog-box.component.sass']
})
export class PostBlogBoxComponent implements OnInit {

  @ViewChild('reference', {static: true}) reference: ElementRef;
  @ViewChild('think', {static: true}) think: ElementRef;

  posting = false;
  newBlog: NewBlog = {
    title: '',
    content: ''
  };
  /**
   * 对谁的见解
   */
  private thinkFrom: ReferenceFrom;
  /**
   * 对谁的引用
   */
  private referenceFrom: ReferenceFrom;

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
      const referenceTarget = `引用<a target="_blank" href="/b/${this.referenceFrom.code}">@${this.referenceFrom.title}</a><br>`;
      this.reference.nativeElement.innerHTML = referenceTarget;
    }
    //  见解
    if (this.thinkFrom && this.thinkFrom.code && this.thinkFrom.title) {
      const thinkTarget = `对<a target="_blank" href="/b/${this.thinkFrom.code}">《${this.thinkFrom.title}》</a>的见解<br>`;
      this.think.nativeElement.innerHTML = thinkTarget;
    }
  }

  post() {
    this.posting = true;
    this.close(true);
  }

  close(success?: boolean) {
    this.dialogRef.close(success);
  }
}
