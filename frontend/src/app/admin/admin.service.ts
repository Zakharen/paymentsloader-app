import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    private userAddedSource = new Subject<boolean>();
    userWasAddedAnnounced$ = this.userAddedSource.asObservable();

    constructor(private http: HttpClient) {
    }

    addUser(user: any) {
        const self = this;
        return self.http
            .post(`${environment.apiUrl}/api/user`, user)
            .pipe(map((result: any) => result));
    }

    announceUserWasAdded(status: boolean) {
        const self = this;
        self.userAddedSource.next(status);
    }
}
