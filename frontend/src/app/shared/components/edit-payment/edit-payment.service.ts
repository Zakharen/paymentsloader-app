import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Dbf} from '../../models';
import {catchError} from 'rxjs/operators';
import {RequestHelperService} from '../../../core/services';
import {environment} from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EditPaymentService {

    private apiUrl = environment.apiUrl;

    constructor(
        private http: HttpClient,
    ) {
    }

    public updateDBF(item: Dbf) {
        const self = this;
        const param = {
            RowId: item.Id,
            Narrative: item.NAZN,
        };
        return self.http
            .post(`${self.apiUrl}/api/dbfUpdate`, param)
            .pipe(catchError(RequestHelperService.handleError));
    }
}
