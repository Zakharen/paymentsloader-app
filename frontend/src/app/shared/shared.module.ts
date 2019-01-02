import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoreModule} from '../core/core.module';
import {ThemePickerModule} from './components/theme-picker';

@NgModule({
    exports: [
        ThemePickerModule,
    ],
    imports: [
        CommonModule,
        CoreModule,
        ThemePickerModule,
    ],
})
export class SharedModule {
}
