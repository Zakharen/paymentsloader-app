import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {MatDialogRef} from '@angular/material';
import {UploaderService} from '../../../uploader/uploader.service';
import {Subject} from 'rxjs';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {RequestHelperService} from '../../../core/services';
import {AuthService} from '../../../auth';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-upload-dialog',
    templateUrl: './upload-dialog.component.html',
    styleUrls: ['./upload-dialog.component.scss']
})
export class UploadDialogComponent implements OnInit, OnDestroy {
    selectedFile: File;
    percentDone = 0;
    private unsubscribe: Subject<any> = new Subject<any>();

    private uploadSucceeded: string;
    private uploadFailed: string;
    private fileSupportError: string;

    constructor(
        public dialogRef: MatDialogRef<UploadDialogComponent>,
        public uploaderService: UploaderService,
        private requestHelperService: RequestHelperService,
        private authService: AuthService,
        private translate: TranslateService,
    ) {
    }

    ngOnInit() {
        this.translate.get([
            'shared.components.uploadDialog.messages.success.upload',
            'shared.components.uploadDialog.messages.errors.upload',
            'shared.components.uploadDialog.messages.errors.support',
        ]).subscribe(value => {
            this.uploadSucceeded = value['shared.components.uploadDialog.messages.success.upload'];
            this.uploadFailed = value['shared.components.uploadDialog.messages.errors.upload'];
            this.fileSupportError = value['shared.components.uploadDialog.messages.errors.support'];
        });
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
            .upload(self.selectedFile)
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
                            self.requestHelperService.snackBarSuccess(self.uploadSucceeded);
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
            wrongExtensionMsg = self.fileSupportError;
        self.selectedFile = null;
        self.requestHelperService.snackBarWarning(wrongExtensionMsg);
    }

    private fileUploadError() {
        const self = this;
        self.requestHelperService.snackBarWarning(self.uploadFailed);
        self.dialogRef.close();
    }
}
