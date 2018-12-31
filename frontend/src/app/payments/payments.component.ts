import {Component, OnInit} from '@angular/core';
import {PaymentsService} from './payments.service';
import {Payment} from '../shared/models';

@Component({
    selector: 'app-payments',
    templateUrl: './payments.component.html',
    styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
    public payments: Payment[] = [];

    constructor(
        private paymentsService: PaymentsService,
    ) {
    }

    ngOnInit() {
        const self = this;
        //  get payments data source
        self.getPayments();
    }

    private getPayments() {
        const self = this;
        self.paymentsService.getPayments()
            .subscribe((res: Payment[]) => {
                self.payments = res;
            });
    }
}
