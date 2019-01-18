import {Component, OnDestroy, OnInit} from '@angular/core';
import {PaymentsService} from './payments.service';
import {Payment} from '../shared/models';
import {GridHelper} from './helpers/grid.helper';
import {FileDates} from '../shared/components/dates-range/models';
import {LoaderService, RequestHelperService} from '../core/services';
import {MatDialog} from '@angular/material';
import {UploadDialogComponent} from '../shared/components/upload-dialog';
import {TranslateService} from '@ngx-translate/core';
import {PrePaymentComponent} from '../shared/components/pre-payment';

@Component({
    selector: 'app-payments',
    templateUrl: './payments.component.html',
    styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit, OnDestroy {
    public payments: Payment[] = [];
    public rowCount: number;
    public gridOptions;

    private updateSuccess: string;
    private updateError: string;
    private generateSuccess: string;
    private generateError: string;
    private gridApi;
    private paymentsToForm: Payment[] = [];

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
        this.setLocalization();
        this.initGridOptions();
    }

    onGridReady(params) {
        this.gridApi = params.api;
    }

    ngOnDestroy(): void {
        this.dialog.closeAll();
    }

    public onSelectionChanged(event) {
        if (event.type === 'selectionChanged') {
            this.rowCount = event.api.getSelectedNodes().length;
        }
    }

    public openUploadDialog() {
        this.dialog.open(UploadDialogComponent, {width: 'auto', height: 'auto'});
    }

    public openPrepaymentDialog() {
        const nodes = this.gridApi.getSelectedNodes();
        this.paymentsToForm = this.getSelectedNodesData(nodes);
        const dialogRef = this.dialog.open(PrePaymentComponent, {
            width: 'auto',
            height: 'auto',
            data: this.paymentsToForm,
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result === 'OK') {
                this.requestHelperService.snackBarSuccess(this.generateSuccess);
                this.paymentsService.announcePaymentsUpdate(true);
            }
            if (result === 'NOK') {
                this.requestHelperService.snackBarWarning(this.generateError);
            }
            this.gridApi.deselectAll();
        });
    }

    public datesRangeChanged(dates: FileDates) {
        const self = this;
        if (self.gridApi) {
            self.gridApi.deselectAll();
        }
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

    private initGridOptions() {
        const self = this;
        self.gridOptions = self.gridHelper.gridOptions;
    }

    private getSelectedNodesData(nodes: any): Payment[] {
        if (nodes instanceof Array && nodes.length) {
            try {
                return nodes.map(node => node.data);
            } catch (e) {
                const errorMsg = 'AgGrid selected rows parsing error';
                this.requestHelperService.snackBarWarning(errorMsg);
                console.log(errorMsg, e);
            }
        }
        return null;
    }

    private setLocalization() {
        const self = this;
        self.translate
            .get([
                'payments.messages.updateSuccess',
                'payments.messages.updateError',
                'shared.components.pre-payment.messages.success.generate',
                'shared.components.pre-payment.messages.errors.generate',
            ])
            .subscribe(values => {
                self.updateSuccess = values['payments.messages.updateSuccess'];
                self.updateError = values['payments.messages.updateError'];
                self.generateSuccess = values['shared.components.pre-payment.messages.success.generate'];
                self.generateError = values['shared.components.pre-payment.messages.errors.generate'];
            });
    }
}
