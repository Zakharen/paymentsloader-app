import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpHeaders} from '@angular/common/http';
import {Observable, Subject, empty} from 'rxjs';
import {environment} from '../../environments/environment';
import {RequestHelperService} from '../core/services';
import {catchError} from 'rxjs/operators';
import {MatDialog} from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class UploaderService {

    private url = environment.apiUrl + '/api/upload';
    private uploadUrl = environment.uploadApiUrl;

    constructor(
        public dialog: MatDialog,
        private http: HttpClient,
        private requestHelperService: RequestHelperService,
    ) {
    }

    public upload(files: Set<File>): { [key: string]: Observable<number> } {
        const self = this;
        // this will be the our resulting map
        const status = {};

        if (files && files.size === 0) {
            self.requestHelperService.snackBarWarning('There are no selected files!!!');
            self.dialog.closeAll();
            return null;
        }

        files.forEach(file => {
            // create a new multipart-form for every file
            const formData: FormData = new FormData();
            formData.append('file', file, file.name);

            // create a http-post request and pass the form
            // tell it to report the upload progress
            const req = new HttpRequest('POST', self.url, formData, {
                reportProgress: true
            });

            // create a new progress-subject for every file
            const progress = new Subject<number>();

            // send the http-request and subscribe for progress-updates
            const startTime = new Date().getTime();
            this.http.request(req)
                .pipe(catchError(RequestHelperService.handleError))
                .subscribe(
                    event => {
                        if (event.type === HttpEventType.UploadProgress) {
                            // calculate the progress percentage
                            const percentDone = Math.round((100 * event.loaded) / event.total);
                            // pass the percentage into the progress-stream
                            progress.next(percentDone);
                        } else if (event instanceof HttpResponse) {
                            // Close the progress-stream if we get an answer form the API
                            // The upload is complete
                            progress.next();
                            progress.complete();
                        }
                    }
                );

            // Save every progress-observable in a map of all observables
            status[file.name] = {
                progress: progress.asObservable()
            };
        });

        // return the map of progress.observables
        return status;
    }

    public load(file: File) {
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
