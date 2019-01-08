import {Injectable} from '@angular/core';

@Injectable()
export class GridHelper {
    public gridOptions = {
        columnDefs: GridHelper.getColumnsDefinitions(),
        enableColResize: true,
    };

    private static getColumnsDefinitions() {
        return [
            {headerName: 'CPU', field: 'CPU'},
            {headerName: 'Confirmed', field: 'Confirmed'},
            {
                headerName: 'DA',
                field: 'DA',
                valueFormatter: GridHelper.dateFormatter,
            },
            {
                headerName: 'DA_DOC',
                field: 'DA_DOC',
                valueFormatter: GridHelper.dateFormatter,
            },
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
    }

    /**
     * Parse grid cell data view for date string
     * @param params agGrid reference
     */
    private static dateFormatter(params: { value: any }): string {
        let date = null;
        if (params.value instanceof Date) {
            date = params.value.toISOString().substring(0, 10);
        } else if (typeof params.value === 'string' && params.value.trim()) {
            try {
                const payloads = params.value.replace(new RegExp('/', 'g'), '');
                const item = payloads.match(/\d+/g).map(Number);
                date = new Date(item[0]).toISOString().substring(0, 10);
            } catch (e) {
                console.log('DBF: Date parsing error');
                date = 'Invalid input date';
            }
        } else {
            date = ' - ';
        }
        return date;
    }
}
