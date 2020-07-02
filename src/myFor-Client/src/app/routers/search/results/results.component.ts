import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.sass']
})
export class ResultsComponent implements OnInit {

  s = '';
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.s = this.route.snapshot.queryParamMap.get('s');
  }

}
