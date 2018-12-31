import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material';
import {RequestHelperService} from './services';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    MaterialModule,
  ],
  declarations: [],
  providers: [
    RequestHelperService,
  ]
})
export class CoreModule {}
