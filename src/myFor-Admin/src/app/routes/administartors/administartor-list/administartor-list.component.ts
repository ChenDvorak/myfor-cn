import { Component, OnInit } from '@angular/core';
import { UserItem, UsersService } from '../../../services/users/users.service';
import { PageEvent } from '@angular/material/paginator/paginator';
import { CommonService, Paginator } from '../../../services/common.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateAdministartorBoxComponent } from '../create-administartor-box/create-administartor-box.component';

@Component({
  selector: 'app-administartor-list',
  templateUrl: './administartor-list.component.html',
  styleUrls: ['./administartor-list.component.css']
})
export class AdministartorListComponent implements OnInit {

  index = 1;
  searchTitle = '';
  size = 0;
  totalSize = 0;

  dataSource: UserItem[] = [];
  columnsToDisplay = ['account', 'email', 'avatar', 'createDate'];

  constructor(
    private common: CommonService,
    private user: UsersService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  private getList() {
    this.user.getAdministartorList(this.index, 15, this.searchTitle).subscribe(result => {
      if (result.status === 200) {
        const pageData = result.data as Paginator<UserItem>;
        this.dataSource = pageData.list;
        this.size = pageData.size;
        this.totalSize = pageData.totalSize;
        this.index = pageData.index;
      } else {
        this.common.snackOpen(result.data as string);
      }
    });
  }

  pageChange(page: PageEvent) {
    this.index = page.pageIndex + 1;
    this.getList();
  }

  search(value: string) {
    this.index = 1;
    value = value.trim();
    this.searchTitle = value;
    this.getList();
  }

  createAdministartor() {
    const createdWindow = this.dialog.open(CreateAdministartorBoxComponent, {
      width: '500px'
    });
    createdWindow.afterClosed().subscribe((isCreated: boolean) => {
      if (isCreated) {
        this.getList();
      }
    });
  }
}
