import { Component, OnInit } from '@angular/core';
import { PostBlogBoxComponent } from '../../blogs/post-blog-box/post-blog-box.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-current-user-nav',
  templateUrl: './current-user-nav.component.html',
  styleUrls: ['./current-user-nav.component.sass']
})
export class CurrentUserNavComponent implements OnInit {

  constructor(
    private dia: MatDialog
  ) { }

  ngOnInit(): void {
  }

  postBlog() {
    this.dia.open(PostBlogBoxComponent, {
      panelClass: 'diaclass'
    });
  }
}
