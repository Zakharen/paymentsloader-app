import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {RequestHelperService} from '../core/services';
import {catchError} from 'rxjs/operators';
import {MatDialog} from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class UploaderService {
    private uploadUrl = environment.uploadApiUrl;

    constructor(
        public dialog: MatDialog,
        private http: HttpClient,
    ) {
    }

    public upload(file: File) {
        const self = this;

        const formData: FormData = new FormData();
        formData.append('file', file);

        const headers = new HttpHeaders();
        headers.append('content-type', 'multipart/form-data');

        return self.http
            .post(self.uploadUrl, formData, {reportProgress: true, headers: headers})
            .pipe(catchError(RequestHelperService.handleError));
    }
}
