import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';
import {RequestHelperService} from '../core/services';
import {Dbf} from '../shared/models';

@Injectable({
    providedIn: 'root'
})
export class DbfService {

    private apiUrl = environment.apiUrl;

    constructor(
        private http: HttpClient,
    ) {
    }

    /**
     * Get all DBFs data
     */
    public getDBFs() {
        const self = this;
        return self.http
            .get<Dbf[]>(`${self.apiUrl}/api/dbfs`)
            .pipe(catchError(RequestHelperService.handleError));
    }
}
