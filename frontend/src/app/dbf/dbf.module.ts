import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DbfRoutingModule} from './dbf-routing.module';
import {DbfComponent} from './dbf.component';
import {DbfService} from './dbf.service';
import {CoreModule} from '../core/core.module';
import {AgGridModule} from 'ag-grid-angular';
import {GridHelper} from './helpers/grid.helper';
import {SharedModule} from '../shared/shared.module';
import {EditPaymentComponent} from '../shared/components/edit-payment';

@NgModule({
    declarations: [DbfComponent],
    exports: [DbfComponent],
    imports: [
        CommonModule,
        CoreModule,
        SharedModule,
        DbfRoutingModule,
        AgGridModule.withComponents([DbfComponent]),
    ],
    entryComponents: [
        EditPaymentComponent,
    ],
    providers: [
        DbfService,
        GridHelper,
    ]
})
export class DbfModule {
}
