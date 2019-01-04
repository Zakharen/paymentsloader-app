import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import {Router} from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {AuthService} from '../../auth';
import {RequestHelperService} from '../services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private requestHelper: RequestHelperService,
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                this.requestHelper.snackBarWarning(err.error.message);
                // auto logout if 401 response returned from api
                AuthService.logout();
                this.router.navigate(['/auth']);
            }
            if (err.status === 409) {
                this.requestHelper.snackBarWarning(err.error.message);
            }
            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }
}
