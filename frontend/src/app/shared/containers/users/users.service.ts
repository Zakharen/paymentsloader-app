import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {catchError} from 'rxjs/operators';
import {RequestHelperService} from '../../../core/services';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    private apiUrl = environment.apiUrl;

    constructor(
        private http: HttpClient,
    ) {
    }

    public getUsers() {
        const self = this;
        return self.http
            .get(`${self.apiUrl}/api/user`)
            .pipe(catchError(RequestHelperService.handleError));
    }

    public removeUser(id: any) {
        const self = this;
        return self.http
            .delete(`${self.apiUrl}/api/user/${id}`)
            .pipe(catchError(RequestHelperService.handleError));
    }
}
