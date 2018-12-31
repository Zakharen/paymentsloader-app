import {Component, OnInit} from '@angular/core';
import {PaymentsService} from './payments.service';
import {Payment} from '../shared/models';
import {PaymentDatabase} from './data-source/payment.database';

import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-payments',
    templateUrl: './payments.component.html',
    styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
    public payments: Payment[] = [];
    public paymentsDatabase: any;
    public isLoadingResults = true;
    public isRateLimitReached = false;
    public displayedColumns: string[] =
        ['row_1', 'row_2', 'row_3', 'row_4', 'row_5', 'row_6', 'row_7', 'row_8', 'row_9', 'row_10', 'row_11', 'row_12', 'row_13', 'Confirmed'];

    constructor(
        private paymentsService: PaymentsService,
    ) {
    }

    ngOnInit() {
        const self = this;
        //  get grid database
        self.paymentsDatabase = new PaymentDatabase(self.paymentsService);
        self.initPaymentGridData();
    }

    private getPayments() {
        const self = this;
        self.paymentsService.getPayments()
            .subscribe((res: Payment[]) => {
                self.payments = res;
            });
    }

    private initPaymentGridData() {
        const self = this;
        merge()
            .pipe(
                startWith({}),
                switchMap(() => {
                    self.isLoadingResults = true;
                    return self.paymentsDatabase.getPaymentsDatasource();
                }),
                map(data => {
                    // Flip flag to show that loading has finished.
                    self.isLoadingResults = false;
                    self.isRateLimitReached = false;

                    return data;
                }),
                catchError(() => {
                    self.isLoadingResults = false;
                    // Catch if the GitHub API has reached its rate limit. Return empty data.
                    self.isRateLimitReached = true;
                    return observableOf([]);
                })
            ).subscribe((data: Payment[]) => self.payments = data);
    }
}
