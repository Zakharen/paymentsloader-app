import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SettingsRoutingModule} from './settings-routing.module';
import {SettingsComponent} from './settings.component';
import {CoreModule} from '../core/core.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    declarations: [SettingsComponent],
    exports: [SettingsComponent],
    imports: [
        CommonModule,
        SettingsRoutingModule,
        CoreModule,
        SharedModule,
    ]
})
export class SettingsModule {
}
