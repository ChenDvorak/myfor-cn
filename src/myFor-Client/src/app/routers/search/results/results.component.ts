import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../global';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.sass']
})
export class ResultsComponent implements OnInit {

  s = '';
  constructor(
    private global: GlobalService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.s = this.route.snapshot.paramMap.get('s');
    this.global.setTitle(this.s + ' 的搜索结果 / myFor');
  }

}
