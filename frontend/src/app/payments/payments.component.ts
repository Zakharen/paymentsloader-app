import {Component, OnInit} from '@angular/core';
import {PaymentsService} from './payments.service';
import {Payment} from '../shared/models';
import {GridHelper} from './helpers/grid.helper';
import {FileDates} from '../shared/components/dates-range/models';
import {LoaderService} from '../core/services';

@Component({
    selector: 'app-payments',
    templateUrl: './payments.component.html',
    styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
    public payments: Payment[] = [];
    public accounts: Account[] = [];
    public gridOptions;

    constructor(
        public loaderService: LoaderService,
        private paymentsService: PaymentsService,
        private gridHelper: GridHelper,
    ) {
    }

    ngOnInit() {
        const self = this;
        // self.getPayments();
        self.getPaymentsAccounts();
        self.initGridOptions();
    }

    public datesRangeChanged(dates: FileDates) {
        const self = this;
        self.getPayments(dates);
    }

    private getPayments(dates?: FileDates) {
        const self = this;
        self.paymentsService.getPayments(dates)
            .subscribe((res: Payment[]) => {
                self.payments = res;
            });
    }

    private getPaymentsAccounts() {
        const self = this;
        self.paymentsService.getAccounts()
            .subscribe((res: Account[]) => {
                debugger;
                self.accounts = res;
            });
    }

    private initGridOptions() {
        const self = this;
        self.gridOptions = self.gridHelper.gridOptions;
    }
}
