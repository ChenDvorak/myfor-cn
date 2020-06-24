import { Component, OnInit } from '@angular/core';
import { Identity } from '../../../global';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})
export class IndexComponent implements OnInit {

  isLoggedIn = false;
  constructor(
    private identity: Identity
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.identity.isLoggedIn;
  }

}
