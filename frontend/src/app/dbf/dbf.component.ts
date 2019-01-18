import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';
import {DbfService} from './dbf.service';
import {Dbf} from '../shared/models';
import {GridHelper} from './helpers/grid.helper';
import {LoaderService, RequestHelperService} from '../core/services';
import {EditPaymentComponent} from '../shared/components/edit-payment';

@Component({
    selector: 'app-dbf',
    templateUrl: './dbf.component.html',
    styleUrls: ['./dbf.component.scss']
})
export class DbfComponent implements OnInit {
    public dbfs: Dbf[] = [];
    public gridOptions;

    private gridApi;
    private updateSuccess: string;
    private updateError: string;

    constructor(
        public dialog: MatDialog,
        public loaderService: LoaderService,
        private dbfService: DbfService,
        private gridHelper: GridHelper,
        private requestHelperService: RequestHelperService,
        private translate: TranslateService,
    ) {
    }

    ngOnInit() {
        const self = this;
        self.setLocalization();
        self.getDBFs();
        self.initGridOptions();
    }

    onGridReady(params) {
        this.gridApi = params.api;
    }

    public rowClicked(event: any) {
        if (event.event.target !== undefined) {
            const self = this;
            const actionType = event.event.target.getAttribute('data-action-type');
            if (actionType === 'edit') {
                self.openPrepaymentDialog(event.data);
            }
        }
    }

    private openPrepaymentDialog(item: Dbf) {
        const dialogRef = this.dialog.open(EditPaymentComponent, {
            width: 'auto',
            height: 'auto',
            data: item,
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result === 'OK') {
                this.requestHelperService.snackBarSuccess(this.updateSuccess);
                this.getDBFs();
            }
            if (result === 'NOK') {
                this.requestHelperService.snackBarWarning(this.updateError);
            }
            this.gridApi.deselectAll();
        });
    }

    private getDBFs() {
        const self = this;
        self.dbfService.getDBFs()
            .subscribe((res: Dbf[]) => {
                self.dbfs = res;
            });
    }

    private initGridOptions() {
        const self = this;
        self.gridOptions = self.gridHelper.gridOptions;
    }

    private setLocalization() {
        const self = this;
        self.translate
            .get([
                'dbf.messages.updateSuccess',
                'dbf.messages.updateError',
            ])
            .subscribe(values => {
                self.updateSuccess = values['dbf.messages.updateSuccess'];
                self.updateError = values['dbf.messages.updateError'];
            });
    }
}
