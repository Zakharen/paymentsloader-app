import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Payment} from '../shared/models';
import {RequestHelperService} from '../core/services';
import {catchError} from 'rxjs/operators';
import {FileDates} from '../shared/components/dates-range/models';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PaymentsService {

    private paymentsWereUpdatedSource = new Subject<boolean>();
    public paymentsUpdateAnnounced$ = this.paymentsWereUpdatedSource.asObservable();

    private apiUrl = environment.apiUrl;

    constructor(
        private http: HttpClient,
    ) {
    }

    /**
     * Get all payments data
     */
    public getPayments(dates?: FileDates) {
        const self = this;
        let paramsString = '';
        if (dates) {
            const params: any = dates;
            paramsString = `?filedatefrom=${params.filedatefrom}&filedateto=${params.filedateto}`;
        }
        return self.http
            .get<Payment[]>(`${self.apiUrl}/api/payments${paramsString}`)
            .pipe(catchError(RequestHelperService.handleError));
    }

    public setPayment(payment: Payment) {
        const self = this;
        const param = {
            RowId: payment.Id,
            Accepted: payment.row_11 === 'False' ? 'True' : 'False',
        };
        return self.http
            .post(`${self.apiUrl}/api/payment`, param)
            .pipe(catchError(RequestHelperService.handleError));
    }

    public announcePaymentsUpdate(status: boolean) {
        const self = this;
        self.paymentsWereUpdatedSource.next(status);
    }
}
