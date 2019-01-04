import {Component, OnInit} from '@angular/core';
import {UsersService} from './users.service';
import {GridHelper} from './helpers/grid.helper';
import {AdminService} from '../../../admin';
import {RequestHelperService} from '../../../core/services';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

    public users: any;
    public gridOptions: any;

    constructor(
        private usersService: UsersService,
        private gridHelper: GridHelper,
        private adminService: AdminService,
        private requestHelper: RequestHelperService,
    ) {
        adminService.userWasAddedAnnounced$.subscribe(status => this.userWasAdded(status));
    }

    ngOnInit() {
        const self = this;
        self.getUsers();
        self.initGridOptions();
    }

    public rowClicked(event: any) {
        if (event.event.target !== undefined) {
            const self = this;
            const actionType = event.event.target.getAttribute('data-action-type');
            if (actionType === 'delete') {
                self.removeUser(event.data.id);
            }
        }
    }

    private getUsers() {
        const self = this;
        self.usersService.getUsers()
            .subscribe((result: any) => self.users = result.users);
    }

    private removeUser(id) {
        const self = this;
        self.usersService.removeUser(id)
            .subscribe((result: any) => {
                self.requestHelper.snackBarSuccess(result.message);
                self.getUsers();
            });
    }

    private initGridOptions() {
        const self = this;
        self.gridOptions = self.gridHelper.gridOptions;
    }

    private userWasAdded(status: boolean) {
        const self = this;
        if (status) {
            self.getUsers();
        }
    }
}
