import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { GlobalService } from './global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  constructor(
    private global: GlobalService,
    @Inject(DOCUMENT) private doc: any
  ) {}

  ngOnInit(): void {
    this.global.title.subscribe(title => {
      this.doc.title = title;
    });
  }
}
