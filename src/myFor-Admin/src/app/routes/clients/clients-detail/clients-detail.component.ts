import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material';
import { ClientsService, ClientDetail } from '../../../services/clients/clients.service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-clients-detail',
  templateUrl: './clients-detail.component.html',
  styleUrls: ['./clients-detail.component.css']
})
export class ClientsDetailComponent implements OnInit {

  id = 0;
  detail: ClientDetail = {
    userName: '',
    email: '',
    avatar: 'assets/images/avatar.png',
    state: {
      key: 1,
      value: ''
    },
    createDate: ''
  };

  constructor(
    private client: ClientsService,
    private route: ActivatedRoute,
    private common: CommonService
  ) { }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'), null);
    this.client.getClientDetail(this.id)
    .subscribe(r => {
      if (r.status !== 200) {
        this.common.snackOpen(r.data as string);
        history.back();
        return;
      }
      this.detail = r.data as ClientDetail;
    });
  }

  enabledOrDisabled(value: MatSlideToggleChange) {
    if (value.checked) {
      this.client.enabledClient(parseInt(value.source.id, null))
      .subscribe(r => {
        if (r.status !== 204) {
          this.common.snackOpen(r.data as string);
          value.checked = true;
          return;
        }
      });
    } else {
      this.client.disabledClient(parseInt(value.source.id, null))
      .subscribe(r => {
        if (r.status !== 204) {
          this.common.snackOpen(r.data as string);
          value.checked = false;
          return;
        }
      });
    }
  }
}
