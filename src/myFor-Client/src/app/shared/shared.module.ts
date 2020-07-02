import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { KiloPipe } from './pipe/kilo.pipe';

import { MaterialModule } from './material.module';
import { SearchBoxComponent } from './search-box/search-box.component';
import { FooterComponent } from './footer/footer.component';
import { LogoComponent } from './logo/logo.component';
import { ContentBoxComponent } from './content-box/content-box.component';
import { SloganComponent } from './slogan/slogan.component';

const EXPORTS_MODULE = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  RouterModule,
  MaterialModule
];

const EXPORTS_COMPONENT = [
  SearchBoxComponent,
  FooterComponent,
  LogoComponent,
  ContentBoxComponent,
  SloganComponent
];

const EXPORTS_PIPE = [
  KiloPipe
];

const EXPORTS_DIRECTIVE = [
];

@NgModule({
  declarations: [...EXPORTS_COMPONENT, ...EXPORTS_PIPE, ...EXPORTS_DIRECTIVE],
  imports: [...EXPORTS_MODULE],
  exports: [...EXPORTS_MODULE,
            ...EXPORTS_COMPONENT,
            ...EXPORTS_DIRECTIVE,
            ...EXPORTS_PIPE],
  providers: []
})
export class SharedModule { }
