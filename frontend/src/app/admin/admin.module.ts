import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {CoreModule} from '../core/core.module';
import {AdminService} from './admin.service';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    declarations: [AdminComponent],
    exports: [AdminComponent],
    imports: [
        CommonModule,
        CoreModule,
        AdminRoutingModule,
        ReactiveFormsModule,
        SharedModule,
    ],
    providers: [AdminService]
})
export class AdminModule {
}
