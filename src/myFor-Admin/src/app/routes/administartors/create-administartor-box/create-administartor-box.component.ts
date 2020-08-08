import { Component, OnInit } from '@angular/core';
import { UsersService, NewUser } from '../../../services/users/users.service';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-create-administartor-box',
  templateUrl: './create-administartor-box.component.html',
  styleUrls: ['./create-administartor-box.component.css']
})
export class CreateAdministartorBoxComponent implements OnInit {

  newModel: NewUser = {
    email: '',
    account: '',
    password: ''
  };
  posting = false;

  constructor(
    private user: UsersService,
    private dialogRef: MatDialogRef<CreateAdministartorBoxComponent>,
    private common: CommonService
  ) { }

  ngOnInit(): void {
  }

  create() {
    const newAdmin$ = this.user.createAdministartor(this.newModel);
    this.posting = true;
    newAdmin$.subscribe(r => {
      if (r.status === 201) {
        this.common.snackOpen('新增成功');
        this.dialogRef.close(true);
      } else {
        this.common.snackOpen(r.data as string);
      }
      this.posting = false;
    });
  }
}
