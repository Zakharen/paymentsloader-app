import {Injectable} from '@angular/core';

@Injectable()
export class GridHelper {
    public gridOptions = {
        columnDefs: GridHelper.getColumnsDefinitions(),
    };

    private static getColumnsDefinitions() {
        return [
            {headerName: 'ЕДпоу', field: 'row_1'},
            {headerName: '№ реестра валидаций', field: 'row_2'},
            {headerName: 'МФО', field: 'row_3'},
            {headerName: 'Банк', field: 'row_4'},
            {headerName: 'Счет', field: 'row_5'},
            {headerName: 'Дата', field: 'row_6'},
            {headerName: 'Row 7', field: 'row_7'},
            {headerName: 'Сумма', field: 'row_8'},
            {headerName: 'Комиссия (%)', field: 'row_9'},
            {headerName: 'К оплате', field: 'row_10'},
            {headerName: 'Row 11', field: 'row_11'},
            {headerName: 'Row 12', field: 'row_12'},
            {headerName: 'Row 13', field: 'row_13'},
            {headerName: 'Confirmed', field: 'Confirmed'},
        ];
    }
}
