import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../shared/services/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})
export class IndexComponent implements OnInit {

  isLoggedIn = false;
  constructor(
    private common: CommonService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.common.setTitle(this.route.snapshot.data.title);
  }

  goback() {
    history.back();
  }
}
