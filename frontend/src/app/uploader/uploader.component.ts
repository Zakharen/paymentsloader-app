import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {UploadDialogComponent} from '../shared/components/upload-dialog';

@Component({
    selector: 'app-uploader',
    templateUrl: './uploader.component.html',
    styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent implements OnInit, OnDestroy {
    dialogRef: any;
    constructor(
        public dialog: MatDialog,
    ) {
    }

    ngOnInit() {
    }

    ngOnDestroy(): void {
        const self = this;
        self.dialog.closeAll();
    }

    /**
     * Open upload dialog
     */
    public openUploadDialog() {
        const self = this;
        self.dialogRef = self.dialog.open(UploadDialogComponent, {width: '50%', height: '50%'});
    }
}
