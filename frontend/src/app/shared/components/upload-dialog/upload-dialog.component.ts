import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {UploaderService} from '../../../uploader/uploader.service';
import {forkJoin} from 'rxjs';

@Component({
    selector: 'app-upload-dialog',
    templateUrl: './upload-dialog.component.html',
    styleUrls: ['./upload-dialog.component.scss']
})
export class UploadDialogComponent implements OnInit {

    @ViewChild('file') file: any;

    public files: Set<File> = new Set();

    public progress;
    public canBeClosed = true;
    public primaryButtonText = 'Upload';
    public showCancelButton = true;
    public uploading = false;
    public uploadSuccessful = false;

    constructor(
        public dialogRef: MatDialogRef<UploadDialogComponent>,
        public uploaderService: UploaderService
    ) {
    }

    ngOnInit() {
    }

    public onFilesAdded() {
        const self = this;
        const files: { [key: string]: File } = self.file.nativeElement.files;
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
}
