import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../../global';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

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

}
