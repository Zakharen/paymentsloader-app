import {Component, OnInit} from '@angular/core';
import {PaymentsService} from './payments.service';

@Component({
    selector: 'app-payments',
    templateUrl: './payments.component.html',
    styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
    public payments: any;

    constructor(
        private paymentsService: PaymentsService,
    ) {
    }

    ngOnInit() {
        const self = this;
        //  get payments data source
        // self.getPayments();

        //  todo: api test call
        self.paymentsService.apiTestCall().subscribe(
            (res: any) => {
                debugger;
            }
        );
    }

    private getPayments() {
        const self = this;
        self.paymentsService.getPayments()
            .subscribe((res: any) => {
                debugger;
            });
    }
}
