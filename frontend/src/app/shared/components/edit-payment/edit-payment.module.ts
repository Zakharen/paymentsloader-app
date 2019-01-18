import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {EditPaymentComponent} from './edit-payment.component';
import {EditPaymentService} from './edit-payment.service';
import {CoreModule} from '../../../core/core.module';

@NgModule({
    declarations: [EditPaymentComponent],
    exports: [EditPaymentComponent],
    imports: [
        CommonModule,
        CoreModule,
        ReactiveFormsModule,
    ],
    providers: [EditPaymentService]
})
export class EditPaymentModule {
}
