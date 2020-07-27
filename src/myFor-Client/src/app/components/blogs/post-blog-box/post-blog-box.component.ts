import { Component, OnInit, OnDestroy, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewBlog, ReferenceFrom } from '../../../components/blogs/blog.models';
import { BlogService } from '../blog.service';
import { CommonService } from '../../../shared/services/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-blog-box',
  templateUrl: './post-blog-box.component.html',
  styleUrls: ['./post-blog-box.component.sass']
})
export class PostBlogBoxComponent implements OnInit, OnDestroy {

  @ViewChild('reference', {static: true}) reference: ElementRef;
  @ViewChild('think', {static: true}) think: ElementRef;

  enterContent = '';
  posting = false;
  newBlog: NewBlog = {
    title: '',
    content: '',
    referenceFrom: '',
    thoughtFrom: ''
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
    private blog: BlogService,
    private common: CommonService,
    private router: Router
  ) { }

  subScription: Subscription;
  ngOnDestroy(): void {
    this.subScription.unsubscribe();
  }

  ngOnInit(): void {
    this.thinkFrom = this.data?.thinkFrom;
    this.referenceFrom = this.data?.referenceFrom;
    //  引用
    if (this.referenceFrom && this.referenceFrom.code && this.referenceFrom.title) {
      const referenceTarget = `引用<a target="_blank" href="/b/${escape(this.referenceFrom.code)}">@${this.referenceFrom.title}</a><br>`;
      this.reference.nativeElement.innerHTML = referenceTarget;
      this.newBlog.referenceFrom = this.referenceFrom.code;
    }
    //  见解
    if (this.thinkFrom && this.thinkFrom.code && this.thinkFrom.title) {
      const thinkTarget = `对<a target="_blank" href="/b/${escape(this.thinkFrom.code)}">《${this.thinkFrom.title}》</a>的见解<br>`;
      this.think.nativeElement.innerHTML = thinkTarget;
      this.newBlog.thoughtFrom = this.thinkFrom.code;
    }

    this.subScription = this.common.insteadKeydownEventChar(document.getElementById('txt-content'), 'Tab', '    ');
    this.subScription.add(this.common.insteadKeydownEventChar(document.getElementById('txt-content'), 'Enter', '\n        '));
  }

  enter(enterContent: string) {
    this.enterContent = enterContent;
  }

  post() {
    this.posting = true;
    this.enterContent = this.enterContent.trim();
    if (this.enterContent === '') {
      this.common.snackOpen('内容不能为空');
      return;
    }
    this.newBlog.content = this.enterContent;

    this.blog.postBlog(this.newBlog).subscribe(r => {
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
