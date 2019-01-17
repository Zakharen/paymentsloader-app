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
        const self = this;
        return self.http
            .get<Account[]>(`${self.apiUrl}/api/accounts`)
            .pipe(catchError(RequestHelperService.handleError));
    }
}
