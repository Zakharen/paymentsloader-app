import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {UploaderService} from './uploader.service';
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
        public uploaderService: UploaderService,
    ) {
    }

    ngOnInit() {
    }

    ngOnDestroy(): void {
        debugger;
        const self = this;
        self.dialogRef.close();
        self.dialog.closeAll();
    }

    public openUploadDialog() {
        const self = this;
        self.dialogRef = self.dialog.open(UploadDialogComponent, {width: '50%', height: '50%'});
    }
}
