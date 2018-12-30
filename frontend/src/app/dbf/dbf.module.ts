import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DbfRoutingModule } from './dbf-routing.module';
import { DbfComponent } from './dbf.component';
import { DbfService } from './dbf.service';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [DbfComponent],
  exports: [DbfComponent],
  imports: [
    CommonModule,
    CoreModule,
    DbfRoutingModule
  ],
  providers: [DbfService]
})
export class DbfModule { }
