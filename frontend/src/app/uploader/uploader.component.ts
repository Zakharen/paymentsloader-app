import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {UploaderService} from './uploader.service';
import {UploadDialogComponent} from '../shared/components/upload-dialog';

@Component({
    selector: 'app-uploader',
    templateUrl: './uploader.component.html',
    styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent implements OnInit {

    constructor(
        public dialog: MatDialog,
        public uploaderService: UploaderService,
    ) {
    }

    ngOnInit() {
    }

    public openUploadDialog() {
        const self = this;
        const dialogRef = self.dialog.open(UploadDialogComponent, {width: '50%', height: '50%'});
    }
}
