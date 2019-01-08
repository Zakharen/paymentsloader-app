import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoreModule} from '../core/core.module';
import {ThemePickerModule} from './components/theme-picker';
import {UsersModule} from './containers/users';
import {DatesRangeModule} from './components/dates-range';

@NgModule({
    exports: [
        ThemePickerModule,
        UsersModule,
        DatesRangeModule
    ],
    imports: [
        CommonModule,
        CoreModule,
        ThemePickerModule,
        UsersModule,
        DatesRangeModule
    ],
})
export class SharedModule {
}
