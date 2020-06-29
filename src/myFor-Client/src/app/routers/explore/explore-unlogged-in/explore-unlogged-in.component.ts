import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../shared/services/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-explore-unlogged-in',
  templateUrl: './explore-unlogged-in.component.html',
  styleUrls: ['./explore-unlogged-in.component.sass']
})
export class ExploreUnloggedInComponent implements OnInit {

  constructor(
    private common: CommonService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const TITLE = this.route.snapshot.data.title;
    if (TITLE) {
      this.common.setTitle(TITLE);
    }
  }

  search(value: string) {

  }
}
