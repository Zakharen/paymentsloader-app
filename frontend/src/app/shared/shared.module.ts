import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoreModule} from '../core/core.module';
import {ThemePickerModule} from './components/theme-picker';
import {UsersModule} from './containers/users';
import {DatesRangeModule} from './components/dates-range';
import {ProgressBarModule} from './components/progress-bar';
import {UploadDialogModule} from './components/upload-dialog';

@NgModule({
    exports: [
        ThemePickerModule,
        UsersModule,
        DatesRangeModule,
        ProgressBarModule,
        UploadDialogModule,
    ],
    imports: [
        CommonModule,
        CoreModule,
        ThemePickerModule,
        UsersModule,
        DatesRangeModule,
        ProgressBarModule,
        UploadDialogModule,
    ],
})
export class SharedModule {
}
