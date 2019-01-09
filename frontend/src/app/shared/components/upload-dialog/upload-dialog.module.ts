import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UploadDialogComponent} from './upload-dialog.component';
import {CoreModule} from '../../../core/core.module';

@NgModule({
    declarations: [UploadDialogComponent],
    exports: [UploadDialogComponent],
    imports: [
        CommonModule,
        CoreModule,
    ]
})
export class UploadDialogModule {
}
