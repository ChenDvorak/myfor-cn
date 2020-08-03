import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { GlobalService, Identity, IdentityInfo } from './global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  constructor(
    private global: GlobalService,
    @Inject(DOCUMENT) private doc: any,
    private identity: Identity
  ) {}

  ngOnInit(): void {
    this.global.title.subscribe(title => {
      this.doc.title = title;
    });
  }
}
