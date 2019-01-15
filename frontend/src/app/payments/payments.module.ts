import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AgGridModule} from 'ag-grid-angular';
import {PaymentsRoutingModule} from './payments-routing.module';
import {CoreModule} from '../core/core.module';
import {SharedModule} from '../shared/shared.module';

import {PaymentsComponent} from './payments.component';
import {PaymentsService} from './payments.service';
import {GridHelper} from './helpers/grid.helper';
import {UploadDialogComponent} from '../shared/components/upload-dialog';

@NgModule({
    declarations: [PaymentsComponent],
    exports: [PaymentsComponent],
    imports: [
        CommonModule,
        PaymentsRoutingModule,
        CoreModule,
        SharedModule,
        AgGridModule.withComponents([PaymentsComponent]),
    ],
    entryComponents: [UploadDialogComponent],
    providers: [
        PaymentsService,
        GridHelper
    ]
})
export class PaymentsModule {
}
