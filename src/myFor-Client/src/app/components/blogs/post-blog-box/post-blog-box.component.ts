import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlogService, NewBlog, ReferenceFrom } from '../blog.service';
import { CommonService } from '../../../shared/services/common';
import { Router } from '@angular/router';
import { Identity } from '../../../global';

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
  private isFromThought = false;
  /**
   * 对谁的引用
   */
  private referenceFrom: ReferenceFrom;
  private isFromReference = false;

  constructor(
    private dialogRef: MatDialogRef<PostBlogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private blog: BlogService,
    private common: CommonService,
    private router: Router,
    private identity: Identity
  ) { }

  ngOnInit(): void {
    this.thinkFrom = this.data?.thinkFrom;
    this.referenceFrom = this.data?.referenceFrom;
    //  引用
    if (this.referenceFrom && this.referenceFrom.code && this.referenceFrom.title) {
      this.isFromReference = true;
      const referenceTarget = `引用<a target="_blank" href="/b/${this.referenceFrom.code}">@${this.referenceFrom.title}</a><br>`;
      this.reference.nativeElement.innerHTML = referenceTarget;
    }
    //  见解
    if (this.thinkFrom && this.thinkFrom.code && this.thinkFrom.title) {
      this.isFromThought = true;
      const thinkTarget = `对<a target="_blank" href="/b/${this.thinkFrom.code}">《${this.thinkFrom.title}》</a>的见解<br>`;
      this.think.nativeElement.innerHTML = thinkTarget;
    }
  }

  post() {
    this.posting = true;

    if (!this.newBlog.content.trim()) {
      this.common.snackOpen('内容不能为空');
      return;
    }

    let from = '';
    if (this.isFromReference) {
      from = this.reference.nativeElement.innerHTML as string;
    } else if (this.isFromThought) {
      from = this.think.nativeElement.innerHTML as string;
    }

    const postBlog: NewBlog = {
      title: this.newBlog.title,
      content: from + this.newBlog.content
    };

    this.blog.postBlog(postBlog).subscribe(r => {
      if (r.status === 201) {
        this.common.snackOpen('发布成功');
        this.router.navigateByUrl(r.location);
      } else {
        this.common.snackOpen(r.data);
      }
      this.close(true);
    });
  }

  close(success?: boolean) {
    this.dialogRef.close(success);
  }
}
