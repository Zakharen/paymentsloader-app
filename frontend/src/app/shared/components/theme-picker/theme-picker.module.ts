import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoreModule} from '../../../core/core.module';
import {ThemePickerComponent} from './theme-picker.component';
import {StyleManagerService} from './style-manager.service';
import {ThemeStorageService} from './theme-storage.service';

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
    ],
    exports: [ThemePickerComponent],
    declarations: [ThemePickerComponent],
    providers: [StyleManagerService, ThemeStorageService],
})
export class ThemePickerModule { }
