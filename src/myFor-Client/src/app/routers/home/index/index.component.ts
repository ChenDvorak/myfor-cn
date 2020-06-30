import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { CommonService } from '../../../shared/services/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})
export class IndexComponent implements OnInit, AfterContentChecked {

  isLoggedIn = false;
  isHomePage = true;
  constructor(
    private common: CommonService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.common.setTitle(this.route.snapshot.data.title);
  }

  ngAfterContentChecked(): void {
      this.isHomePage = location.pathname === '/';
  }

  goback() {
    history.back();
  }
}
