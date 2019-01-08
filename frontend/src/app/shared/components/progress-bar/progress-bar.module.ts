import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProgressBarComponent} from './progress-bar.component';
import {CoreModule} from '../../../core/core.module';

@NgModule({
    declarations: [ProgressBarComponent],
    exports: [ProgressBarComponent],
    imports: [
        CommonModule,
        CoreModule,
    ]
})
export class ProgressBarModule {
}
