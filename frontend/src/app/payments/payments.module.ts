import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PaymentsRoutingModule} from './payments-routing.module';
import {PaymentsComponent} from './payments.component';
import {CoreModule} from '../core/core.module';
import {PaymentsService} from './payments.service';

import {AgGridModule} from 'ag-grid-angular';
import {GridHelper} from './helpers/grid.helper';

@NgModule({
    declarations: [PaymentsComponent],
    exports: [PaymentsComponent],
    imports: [
        CommonModule,
        PaymentsRoutingModule,
        CoreModule,
        AgGridModule.withComponents([PaymentsComponent]),
    ],
    providers: [
        PaymentsService,
        GridHelper
    ]
})
export class PaymentsModule {
}
