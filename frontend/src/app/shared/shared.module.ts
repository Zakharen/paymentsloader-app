import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoreModule} from '../core/core.module';
import {ThemePickerModule} from './components/theme-picker';
import {UsersModule} from './containers/users';
import {DatesRangeModule} from './components/dates-range';
import {ProgressBarModule} from './components/progress-bar';
import {UploadDialogModule} from './components/upload-dialog';
import {PrePaymentModule} from './components/pre-payment';

@NgModule({
    exports: [
        ThemePickerModule,
        UsersModule,
        DatesRangeModule,
        ProgressBarModule,
        UploadDialogModule,
        PrePaymentModule,
    ],
    imports: [
        CommonModule,
        CoreModule,
        ThemePickerModule,
        UsersModule,
        DatesRangeModule,
        ProgressBarModule,
        UploadDialogModule,
        PrePaymentModule,
    ],
})
export class SharedModule {
}
