import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../shared/services/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})
export class IndexComponent implements OnInit {

  constructor(
    private common: CommonService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.common.setTitleFromRoute(this.route.snapshot.data.title);
  }

}
