import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UploaderRoutingModule} from './uploader-routing.module';
import {UploaderComponent} from './uploader.component';
import {CoreModule} from '../core/core.module';
import {UploaderService} from './uploader.service';
import {SharedModule} from '../shared/shared.module';
import {UploadDialogComponent} from '../shared/components/upload-dialog';

@NgModule({
    declarations: [UploaderComponent],
    exports: [UploaderComponent],
    imports: [
        CommonModule,
        CoreModule,
        SharedModule,
        UploaderRoutingModule,
    ],
    entryComponents: [UploadDialogComponent],
    providers: [UploaderService]
})
export class UploaderModule {
}
