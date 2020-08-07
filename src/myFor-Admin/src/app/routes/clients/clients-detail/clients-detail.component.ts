import { Component, OnInit } from '@angular/core';
import { ClientsService, ClientDetail } from '../../../services/clients/clients.service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-clients-detail',
  templateUrl: './clients-detail.component.html',
  styleUrls: ['./clients-detail.component.css']
})
export class ClientsDetailComponent implements OnInit {

  detail: ClientDetail = {
    account: '',
    name: '',
    email: '',
    avatar: 'assets/images/avatar.png',
    introduction: '',
    createDate: ''
  };

  constructor(
    private client: ClientsService,
    private route: ActivatedRoute,
    private common: CommonService
  ) { }

  ngOnInit() {
    this.detail.account = this.route.snapshot.paramMap.get('account');
    this.client.getClientDetail(this.detail.account)
    .subscribe(r => {
      if (r.status !== 200) {
        this.common.snackOpen(r.data as string);
        history.back();
        return;
      }
      this.detail = r.data as ClientDetail;
    });
  }
}
