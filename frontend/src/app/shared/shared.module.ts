import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoreModule} from '../core/core.module';
import {ThemePickerModule} from './components/theme-picker';
import {UsersModule} from './containers/users';

@NgModule({
    exports: [
        ThemePickerModule,
        UsersModule,
    ],
    imports: [
        CommonModule,
        CoreModule,
        ThemePickerModule,
        UsersModule,
    ],
})
export class SharedModule {
}
