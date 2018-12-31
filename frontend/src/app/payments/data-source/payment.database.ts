import {Observable} from 'rxjs';

import {PaymentsService} from '../payments.service';

export class PaymentDatabase {
    constructor(private paymentsService: PaymentsService) {}

    public getPaymentsDatasource(): Observable<any> {
        const self = this;
        return self.paymentsService.getPayments(); //  this.http.get<any>(requestUrl);
    }
}
