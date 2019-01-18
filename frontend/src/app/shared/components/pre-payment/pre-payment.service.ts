import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {RequestHelperService} from '../../../core/services';
import {Account} from '../../models';

@Injectable({
    providedIn: 'root'
})
export class PrePaymentService {

    private apiUrl = environment.apiUrl;

    constructor(
        private http: HttpClient,
    ) {
    }

    public getAccounts() {
        return this.http
            .get<Account[]>(`${this.apiUrl}/api/accounts`)
            .pipe(catchError(RequestHelperService.handleError));
    }

    public createPayment(payload: any) {
        return this.http
            .post(`${this.apiUrl}/api/generate`, payload)
            .pipe(catchError(RequestHelperService.handleError));
    }
}
