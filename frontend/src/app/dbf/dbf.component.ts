import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';
import {DbfService} from './dbf.service';
import {Dbf, Payment} from '../shared/models';
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
    public rowCount: number;
    public gridOptions;

    private gridApi;
    private updateSuccess: string;
    private updateError: string;
    private selectedItems: Dbf[] = [];

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

    public onSelectionChanged(event) {
        if (event.type === 'selectionChanged') {
            this.rowCount = event.api.getSelectedNodes().length;
            const nodes = event.api.getSelectedNodes();
            this.selectedItems = this.getSelectedNodesData(nodes);
        }
    }

    public generate(event) {
        const payload = {
            ids: this.selectedItems.map((item: Dbf) => {
                return {ID: item.Id};
            }),
        };
        debugger;

        this.dbfService
            .generate(payload)
            .subscribe(
                res => {
                    debugger;
                },
                err => {
                    debugger;
                }
            );
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

    private getSelectedNodesData(nodes: any): Dbf[] {
        if (nodes instanceof Array && nodes.length) {
            try {
                return nodes.map(node => node.data);
            } catch (e) {
                const errorMsg = 'AgGrid selected rows parsing error';
                this.requestHelperService.snackBarWarning(errorMsg);
                console.log(errorMsg, e);
            }
        }
        return null;
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
