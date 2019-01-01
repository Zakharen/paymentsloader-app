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
    public columnDefs = [
        {headerName: 'Row 1', field: 'row_1'},
        {headerName: 'Row 2', field: 'row_2'},
        {headerName: 'Row 3', field: 'row_3'},
        {headerName: 'Row 4', field: 'row_4'},
        {headerName: 'Row 5', field: 'row_5'},
        {headerName: 'Row 6', field: 'row_6'},
        {headerName: 'Row 7', field: 'row_7'},
        {headerName: 'Row 8', field: 'row_8'},
        {headerName: 'Row 9', field: 'row_9'},
        {headerName: 'Row 10', field: 'row_10'},
        {headerName: 'Row 11', field: 'row_11'},
        {headerName: 'Row 12', field: 'row_12'},
        {headerName: 'Row 13', field: 'row_13'},
        {headerName: 'Confirmed', field: 'Confirmed'},
    ];

    constructor(
        private paymentsService: PaymentsService,
    ) {
    }

    ngOnInit() {
        const self = this;
        //  get payments data source
        self.getPayments();
    }

    /**
     * TODO:
     * on the backend parse response by row_N and contains
     * specific words such as Bank, MFO, etc.
     */

    private getPayments() {
        const self = this;
        self.paymentsService.getPayments()
            .subscribe((res: Payment[]) => {
                self.payments = res;
            });
    }
}
