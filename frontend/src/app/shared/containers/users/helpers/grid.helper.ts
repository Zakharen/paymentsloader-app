import {Injectable} from '@angular/core';

@Injectable()
export class GridHelper {
    public gridOptions = {
        columnDefs: GridHelper.getColumnsDefinitions(),
    };

    private static getColumnsDefinitions() {
        return [
            {headerName: 'Name', field: 'name'},
            {headerName: 'Email', field: 'email'},
            {headerName: 'Credential', field: 'type'},
            {
                headerName: 'Actions',
                suppressSorting: true,
                suppressFilter: true,
                suppressNavigable: true,
                cellRenderer: (params) => GridHelper.actionButtons(params)
            },
        ];
    }

    private static actionButtons(params) {
        return `<i class="material-icons position" style="margin: 12px;cursor: pointer;" data-action-type="delete">delete_forever</i>`;
    }
}
