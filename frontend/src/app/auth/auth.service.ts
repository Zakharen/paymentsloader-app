import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) {
    }

    login(email: string, password: string): Observable<boolean> {
        return this.http.post<{ token: string }>(`${environment.apiUrl}/login`, {email: email, password: password})
            .pipe(
                map((result: any) => {
                    localStorage.setItem('access_token', result.access_token);
                    return true;
                })
            );
    }

    logout() {
        localStorage.removeItem('access_token');
    }

    public get loggedIn(): boolean {
        return (localStorage.getItem('access_token') !== null);
    }
}
