import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentsComponent } from './payments.component';
import { CoreModule } from '../core/core.module';
import { PaymentsService } from './payments.service';

import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [PaymentsComponent],
  exports: [PaymentsComponent],
  imports: [
    CommonModule,
    PaymentsRoutingModule,
    CoreModule,
    AgGridModule.withComponents([PaymentsComponent]),
  ],
  providers: [PaymentsService]
})
export class PaymentsModule { }
