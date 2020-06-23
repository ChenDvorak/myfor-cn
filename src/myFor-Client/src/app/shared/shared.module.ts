import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material.module';

const EXPORTS_MODULE = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  RouterModule,
  MaterialModule
];

const EXPORTS_COMPONENT = [
];

const EXPORTS_PIPE = [
];

const EXPORTS_DIRECTIVE = [
];

@NgModule({
  declarations: [...EXPORTS_COMPONENT, ...EXPORTS_PIPE, ...EXPORTS_DIRECTIVE],
  imports: [...EXPORTS_MODULE],
  exports: [...EXPORTS_MODULE, ...EXPORTS_COMPONENT, ...EXPORTS_DIRECTIVE],
  providers: [...EXPORTS_PIPE]
})
export class SharedModule { }
