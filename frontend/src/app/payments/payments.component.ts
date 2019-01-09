import {Component, OnInit} from '@angular/core';
import {PaymentsService} from './payments.service';
import {Payment} from '../shared/models';
import {GridHelper} from './helpers/grid.helper';
import {FileDates} from '../shared/components/dates-range/models';
import {LoaderService, RequestHelperService} from '../core/services';

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
        private requestHelperService: RequestHelperService,
    ) {
    }

    ngOnInit() {
        const self = this;
        self.getPaymentsAccounts();
        self.initGridOptions();
    }

    public datesRangeChanged(dates: FileDates) {
        const self = this;
        self.getPayments(dates);
    }

    public rowClicked(event: any) {
        if (event.event.target !== undefined) {
            const self = this;
            const actionType = event.event.target.getAttribute('data-action-type');
            if (actionType === 'set') {
               self.setPayment(event.data);
            }
        }
    }

    private getPayments(dates?: FileDates) {
        const self = this;
        self.paymentsService.getPayments(dates)
            .subscribe((res: Payment[]) => {
                self.payments = res;
            });
    }

    private setPayment(rowData: any) {
        const self = this;
        self.paymentsService
            .setPayment(rowData)
            .subscribe(
                (res: any) => {
                    self.requestHelperService.snackBarSuccess('Payment was updated!');
                    self.paymentsService.announcePaymentsUpdate(true);
                },
                (err: any) => self.requestHelperService.snackBarWarning('Payment wasn\'t updated. Try again!'),
            );
    }

    private getPaymentsAccounts() {
        const self = this;
        self.paymentsService.getAccounts()
            .subscribe((res: Account[]) => {
                self.accounts = res;
            });
    }

    private initGridOptions() {
        const self = this;
        self.gridOptions = self.gridHelper.gridOptions;
    }
}
