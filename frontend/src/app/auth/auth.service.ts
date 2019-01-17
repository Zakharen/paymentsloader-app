import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {RequestHelperService} from '../core/services';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public static loggedIn(): boolean {
        return (localStorage.getItem(environment.storageKeys.token) !== null);
    }

    public static userCredentials(): string {
        return localStorage.getItem(environment.storageKeys.userCredentials);
    }

    public static logout() {
        localStorage.removeItem(environment.storageKeys.token);
        localStorage.removeItem(environment.storageKeys.userCredentials);
    }

    constructor(private http: HttpClient) {
    }

    login(email: string, password: string): Observable<boolean> {
        return this.http.post<{ token: string }>(`${environment.apiUrl}/api/login`, {email: email, password: password})
            .pipe(
                map((result: any) => {
                    localStorage.setItem(environment.storageKeys.token, result.access_token);
                    localStorage.setItem(environment.storageKeys.userCredentials, result.userCredentials);
                    return true;
                })
            );
    }

    sessionCheck() {
        return this.http
            .get(`${environment.apiUrl}/api/check`)
            .pipe(catchError(RequestHelperService.handleError));
    }
}
