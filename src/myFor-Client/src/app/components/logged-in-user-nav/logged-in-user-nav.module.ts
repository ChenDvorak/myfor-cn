import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { CurrentUserNavComponent } from './current-user-nav/current-user-nav.component';


@NgModule({
  declarations: [CurrentUserNavComponent],
  imports: [
    SharedModule
  ]
})
export class LoggedInUserNavModule { }
