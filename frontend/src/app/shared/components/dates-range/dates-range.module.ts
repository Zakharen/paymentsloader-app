import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatesRangeComponent } from './dates-range.component';
import {CoreModule} from '../../../core/core.module';

@NgModule({
  declarations: [DatesRangeComponent],
  exports: [DatesRangeComponent],
  imports: [
    CommonModule,
    CoreModule,
    ReactiveFormsModule
  ]
})
export class DatesRangeModule { }
