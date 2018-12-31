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
