import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../../global';

@Component({
  selector: 'app-explore-unlogged-in',
  templateUrl: './explore-unlogged-in.component.html',
  styleUrls: ['./explore-unlogged-in.component.sass']
})
export class ExploreUnloggedInComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private global: GlobalService
  ) { }

  ngOnInit(): void {
    const TITLE = this.route.snapshot.data.title;
    if (TITLE) {
      this.global.setTitle(TITLE);
    }
  }

  search(value: string) {

  }
}
