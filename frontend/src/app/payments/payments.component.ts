import {Component, OnDestroy, OnInit} from '@angular/core';
import {PaymentsService} from './payments.service';
import {Payment} from '../shared/models';
import {GridHelper} from './helpers/grid.helper';
import {FileDates} from '../shared/components/dates-range/models';
import {LoaderService, RequestHelperService} from '../core/services';
import {MatDialog} from '@angular/material';
import {UploadDialogComponent} from '../shared/components/upload-dialog';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-payments',
    templateUrl: './payments.component.html',
    styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit, OnDestroy {
    public payments: Payment[] = [];
    public accounts: Account[] = [];
    public gridOptions;

    private updateSuccess: string;
    private updateError: string;

    constructor(
        public dialog: MatDialog,
        public loaderService: LoaderService,
        private paymentsService: PaymentsService,
        private gridHelper: GridHelper,
        private requestHelperService: RequestHelperService,
        private translate: TranslateService,
    ) {
    }

    ngOnInit() {
        const self = this;
        self.setLocalization();
        self.getPaymentsAccounts();
        self.initGridOptions();
    }

    ngOnDestroy(): void {
        const self = this;
        self.dialog.closeAll();
    }

    public openUploadDialog() {
        const self = this;
        self.dialog.open(UploadDialogComponent, {width: 'auto', height: 'auto'});
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
                    self.requestHelperService.snackBarSuccess(self.updateSuccess);
                    self.paymentsService.announcePaymentsUpdate(true);
                },
                (err: any) => self.requestHelperService.snackBarWarning(self.updateError),
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

    private setLocalization() {
        const self = this;
        self.translate
            .get([
                'payments.messages.updateSuccess',
                'payments.messages.updateError',
            ])
            .subscribe(values => {
                self.updateSuccess = values['payments.messages.updateSuccess'];
                self.updateError = values['payments.messages.updateError'];
            });
    }
}
