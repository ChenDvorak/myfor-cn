import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { AdministartorsRoutingModule } from './administartors-routing.module';
import { AdministartorListComponent } from './administartor-list/administartor-list.component';
import { CreateAdministartorBoxComponent } from './create-administartor-box/create-administartor-box.component';


@NgModule({
  declarations: [AdministartorListComponent, CreateAdministartorBoxComponent],
  imports: [
    SharedModule,
    AdministartorsRoutingModule
  ]
})
export class AdministartorsModule { }
