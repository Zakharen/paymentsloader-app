import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    constructor(private http: HttpClient) {
    }

    addUser(user: any) {
        const self = this;
        return self.http
            .post(`${environment.apiUrl}/api/user`, user)
            .pipe(map((result: any) => result));
    }
}
