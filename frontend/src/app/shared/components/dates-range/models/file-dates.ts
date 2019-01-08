export class FileDates {
    private filedatefrom: Date | string;
    private filedateto: Date | string;

    constructor(filedatefrom: Date | string, filedateto: Date | string) {
        this.filedatefrom = filedatefrom;
        this.filedateto = filedateto;
    }

    public get range() {
        return {
            filedatefrom: this.filedatefrom,
            filedateto: this.filedateto
        };
    }
}
