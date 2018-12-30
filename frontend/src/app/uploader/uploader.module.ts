import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploaderRoutingModule } from './uploader-routing.module';
import { UploaderComponent } from './uploader.component';
import { CoreModule } from '../core/core.module';
import { UploaderService } from './uploader.service';

@NgModule({
  declarations: [UploaderComponent],
  exports: [UploaderComponent],
  imports: [
    CommonModule,
    CoreModule,
    UploaderRoutingModule
  ],
  providers: [UploaderService]
})
export class UploaderModule { }
