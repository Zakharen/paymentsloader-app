import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {UploaderService} from '../../../uploader/uploader.service';
import {Subject} from 'rxjs';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {RequestHelperService} from '../../../core/services';
import {AuthService} from '../../../auth';
import {takeUntil} from "rxjs/operators";

@Component({
    selector: 'app-upload-dialog',
    templateUrl: './upload-dialog.component.html',
    styleUrls: ['./upload-dialog.component.scss']
})
export class UploadDialogComponent implements OnDestroy {
    selectedFile: File;
    percentDone = 0;
    private unsubscribe: Subject<any> = new Subject<any>();

    constructor(
        public dialogRef: MatDialogRef<UploadDialogComponent>,
        public uploaderService: UploaderService,
        private requestHelperService: RequestHelperService,
        private authService: AuthService,
    ) {
    }

    ngOnDestroy() {
        const self = this;
        self.unsubscribe.next();
        self.unsubscribe.complete();
    }

    onFileChanged(event) {
        const self = this;
        self.selectedFile = event.target.files[0];
        if (self.selectedFile && self.selectedFile instanceof File) {
            const fileExtension = self.selectedFile.name.split('.').pop();
            if (fileExtension !== 'xls') {
                self.fileNotSupported();
            }
        } else {
            self.fileNotSupported();
        }
    }

    onUpload() {
        const self = this;
        self.authService
            .sessionCheck()
            .pipe(takeUntil(self.unsubscribe))
            .subscribe(res => self.sendFile());
    }

    private sendFile() {
        const self = this;
        self.uploaderService
            .load(self.selectedFile)
            .pipe(takeUntil(self.unsubscribe))
            .subscribe(
                (event: any) => {
                    if (event.type === HttpEventType.UploadProgress) {
                        // calculate the progress percentage
                        self.percentDone = Math.round((100 * event.loaded) / event.total);
                    } else if (event instanceof HttpResponse) {
                        // Close the progress-stream if we get an answer form the API
                        // The upload is complete
                        if (event.status === 200 && event.statusText === 'OK') {
                            self.percentDone = 100;
                            self.requestHelperService.snackBarSuccess('File successfully uploaded!');
                            self.dialogRef.close();
                        } else {
                            self.fileUploadError();
                        }
                    }
                },
                (error: any) => self.fileUploadError()
            );
    }

    private fileNotSupported() {
        const self = this,
            wrongExtensionMsg = 'File not supported! *.XLS only';
        self.selectedFile = null;
        self.requestHelperService.snackBarWarning(wrongExtensionMsg);
    }

    private fileUploadError() {
        const self = this;
        self.requestHelperService.snackBarWarning('File upload error! But you could try one more time.');
        self.dialogRef.close();
    }
}
