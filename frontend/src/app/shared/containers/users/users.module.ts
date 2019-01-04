import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AgGridModule} from 'ag-grid-angular';
import {UsersComponent} from './users.component';
import {UsersService} from './users.service';
import {CoreModule} from '../../../core/core.module';
import {GridHelper} from './helpers/grid.helper';

@NgModule({
    declarations: [UsersComponent],
    exports: [UsersComponent],
    imports: [
        CommonModule,
        CoreModule,
        AgGridModule.withComponents([UsersComponent])
    ],
    providers: [
        UsersService,
        GridHelper,
    ]
})
export class UsersModule {
}
