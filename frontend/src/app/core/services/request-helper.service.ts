import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class RequestHelperService {

    constructor(
        private snackBar: MatSnackBar,
    ) {}

    public static handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    }

    public snackBarWarning(message: string, duration?: number) {
        const self = this;
        self.snackBar.open(message, null, <MatSnackBarConfig>{
            duration: duration || 3000,
            extraClasses: ['warning']
        });
    }

    public snackBarSuccess(message: string) {
        const self = this;
        self.snackBar.open(message, null, <MatSnackBarConfig>{
            duration: 3000,
            extraClasses: ['success']
        });
    }
}
