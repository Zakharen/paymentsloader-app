import {Component, OnInit} from '@angular/core';
import {DbfService} from './dbf.service';
import {Dbf} from '../shared/models';
import {GridHelper} from './helpers/grid.helper';
import {LoaderService} from '../core/services';

@Component({
    selector: 'app-dbf',
    templateUrl: './dbf.component.html',
    styleUrls: ['./dbf.component.scss']
})
export class DbfComponent implements OnInit {
    public dbfs: Dbf[] = [];
    public gridOptions;

    constructor(
        public loaderService: LoaderService,
        private dbfService: DbfService,
        private gridHelper: GridHelper,
    ) {
    }

    ngOnInit() {
        const self = this;
        self.getDBFs();
        self.initGridOptions();
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
}
