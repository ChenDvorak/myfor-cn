import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../shared/services/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

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

}
