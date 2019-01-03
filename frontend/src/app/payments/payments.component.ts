import {Component, OnInit} from '@angular/core';
import {PaymentsService} from './payments.service';
import {Payment} from '../shared/models';
import {GridHelper} from './helpers/grid.helper';

@Component({
    selector: 'app-payments',
    templateUrl: './payments.component.html',
    styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
    public payments: Payment[] = [];
    public gridOptions;

    constructor(
        private paymentsService: PaymentsService,
        private gridHelper: GridHelper,
    ) {
    }

    ngOnInit() {
        const self = this;
        self.getPayments();
        self.initGridOptions();
    }

    private getPayments() {
        const self = this;
        self.paymentsService.getPayments()
            .subscribe((res: Payment[]) => {
                self.payments = res;
            });
    }

    private initGridOptions() {
        const self = this;
        self.gridOptions = self.gridHelper.gridOptions;
    }
}
