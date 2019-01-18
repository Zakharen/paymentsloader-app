import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {PrePaymentComponent} from './pre-payment.component';
import {CoreModule} from '../../../core/core.module';
import {PrePaymentService} from './pre-payment.service';

@NgModule({
    declarations: [PrePaymentComponent],
    exports: [PrePaymentComponent],
    imports: [
        CommonModule,
        CoreModule,
        ReactiveFormsModule,
    ],
    providers: [PrePaymentService]
})
export class PrePaymentModule {
}
