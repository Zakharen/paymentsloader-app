import {Component, OnInit} from '@angular/core';
import {DbfService} from './dbf.service';
import {Dbf} from '../shared/models';

@Component({
    selector: 'app-dbf',
    templateUrl: './dbf.component.html',
    styleUrls: ['./dbf.component.scss']
})
export class DbfComponent implements OnInit {

    public dbfs: Dbf[] = [];
    public columnDefs = [
        {headerName: 'CPU', field: 'CPU'},
        {headerName: 'Confirmed', field: 'Confirmed'},
        {headerName: 'Row 3', field: 'DA'},
        {headerName: 'Row 4', field: 'DA_DOC'},
        {headerName: 'Row 5', field: 'DK'},
        {headerName: 'Row 6', field: 'I_VA'},
        {headerName: 'Row 7', field: 'Id'},
        {headerName: 'Row 8', field: 'KB_A'},
        {headerName: 'Row 9', field: 'KB_B'},
        {headerName: 'KK_A', field: 'KK_A'},
        {headerName: 'KK_B', field: 'KK_B'},
        {headerName: 'KOD_A', field: 'KOD_A'},
        {headerName: 'KOD_B', field: 'KOD_B'},
        {headerName: 'NAZN', field: 'NAZN'},
        {headerName: 'NDOC', field: 'NDOC'},
        {headerName: 'NK_A', field: 'NK_A'},
        {headerName: 'NK_B', field: 'NK_B'},
        {headerName: 'SUMMA', field: 'SUMMA'},
        {headerName: 'VID', field: 'VID'},
    ];

    constructor(
        private dbfService: DbfService,
    ) {
    }

    ngOnInit() {
        const self = this;
        self.getDBFs();
    }

    private getDBFs() {
        const self = this;
        self.dbfService.getDBFs()
            .subscribe((res: Dbf[]) => {
                self.dbfs = res;
            });
    }
}