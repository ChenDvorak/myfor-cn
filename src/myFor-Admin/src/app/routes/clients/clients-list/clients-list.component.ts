import { Component, OnInit } from '@angular/core';
import { ClientsService, ClientItem } from '../../../services/clients/clients.service';
import { PageEvent, MatSlideToggleChange } from '@angular/material';
import { CommonService, Paginator } from '../../../services/common.service';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit {

  index = 1;
  searchTitle = '';
  size = 0;
  totalSize = 0;

  dataSource: ClientItem[] = [];
  columnsToDisplay = ['account', 'name', 'avatar', 'createDate', 'action'];

  constructor(
    private client: ClientsService,
    private common: CommonService
  ) { }

  ngOnInit() {
    this.getClientsList();
  }

  pageChange(page: PageEvent) {
    this.index = page.pageIndex + 1;
    this.getClientsList();
  }

  private getClientsList() {
    this.client.getClients(this.index, this.searchTitle).subscribe(result => {
      if (result.status === 200) {
        const pageData = result.data as Paginator<ClientItem>;
        this.dataSource = pageData.list;
        this.size = pageData.size;
        this.totalSize = pageData.totalSize;
        this.index = pageData.index;
      } else {
        this.common.snackOpen(result.data as string);
      }
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

  search(value: string) {
    this.index = 1;
    value = value.trim();
    this.searchTitle = value;
    this.getClientsList();
  }
}
