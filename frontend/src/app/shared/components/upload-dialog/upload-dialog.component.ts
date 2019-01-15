import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {UploaderService} from '../../../uploader/uploader.service';
import {forkJoin, Subject} from 'rxjs';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {RequestHelperService} from '../../../core/services';

@Component({
    selector: 'app-upload-dialog',
    templateUrl: './upload-dialog.component.html',
    styleUrls: ['./upload-dialog.component.scss']
})
export class UploadDialogComponent implements OnInit {

    /*
    @ViewChild('file') file: any;

    public files: Set<File> = new Set();

    public progress;
    public canBeClosed = true;
    public primaryButtonText = 'Upload';
    public showCancelButton = true;
    public uploading = false;
    public uploadSuccessful = false;
    */

    selectedFile: File;
    progress: Subject<number> = new Subject<number>();
    percentDone = 0;

    constructor(
        public dialogRef: MatDialogRef<UploadDialogComponent>,
        public uploaderService: UploaderService,
        private requestHelperService: RequestHelperService,
    ) {
    }

    ngOnInit() {
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
        // upload code goes here
        const self = this;
        self.uploaderService
            .load(self.selectedFile)
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
                            self.requestHelperService.snackBarWarning('File upload error!');
                            self.dialogRef.close();
                        }
                    }
                }
            );
    }

    private fileNotSupported() {
        const self = this,
            wrongExtensionMsg = 'File not supported! *.XLS only';
        self.selectedFile = null;
        self.requestHelperService.snackBarWarning(wrongExtensionMsg);
    }

    /*
    public onFilesAdded() {
        const self = this;
        const files: { [key: string]: File } = self.file.nativeElement.files;
        debugger;
        for (const key in files) {
            if (files.hasOwnProperty(key)) {
                // check radix param for:
                // If the string begins with "0x", the radix is 16 (hexadecimal)
                // If the string begins with "0", the radix is 8 (octal). This feature is deprecated
                // If the string begins with any other value, the radix is 10 (decimal)
                if (!isNaN(parseInt(key, 10))) {
                    self.files.add(files[key]);
                }
            }
        }
    }

    public addFiles() {
        const self = this;
        self.file.nativeElement.click();
    }

    public closeDialog() {
        const self = this;
        debugger;
        // if everything was uploaded already, just close the dialog
        if (self.uploadSuccessful) {
            return self.dialogRef.close();
        }

        // set the component state to "uploading"
        self.uploading = true;

        // start the upload and save the progress map
        self.progress = self.uploaderService.upload(self.files);
        console.log(self.progress);
        for (const key in self.progress) {
            if (self.progress.hasOwnProperty(key)) {
                self.progress[key].progress.subscribe(val => {
                    console.log(val);
                });
            }
        }

        // convert the progress map into an array
        const allProgressObservables = [];
        for (const key in self.progress) {
            if (self.progress.hasOwnProperty(key)) {
                allProgressObservables.push(self.progress[key].progress);
            }
        }

        // Adjust the state variables

        // The OK-button should have the text "Finish" now
        self.primaryButtonText = 'Finish';

        // The dialog should not be closed while uploading
        self.canBeClosed = false;
        self.dialogRef.disableClose = true;

        // Hide the cancel-button
        self.showCancelButton = false;

        // When all progress-observables are completed...
        forkJoin(allProgressObservables).subscribe(
            end => {
                // ... the dialog can be closed again...
                self.canBeClosed = true;
                self.dialogRef.disableClose = false;

                // ... the upload was successful...
                self.uploadSuccessful = true;

                // ... and the component is no longer uploading
                self.uploading = false;
            });
    }
    */
}
