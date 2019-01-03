import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material';
import {RequestHelperService} from './services';
import {CredentialsGuard} from './guards/credentials.guard';

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
    CredentialsGuard,
  ]
})
export class CoreModule {}
