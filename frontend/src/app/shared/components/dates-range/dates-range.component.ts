import {Component, OnInit, EventEmitter, Output, OnDestroy, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FileDates} from './models/';

@Component({
    selector: 'app-dates-range',
    templateUrl: './dates-range.component.html',
    styleUrls: ['./dates-range.component.scss']
})
export class DatesRangeComponent implements OnInit, OnDestroy {

    public datesRangeForm: FormGroup;
    public errorMsg = 'Date value is required!';
    @Input() isoString = false;
    @Output() formChanged: EventEmitter<FileDates> = new EventEmitter();

    public static parseFormValue(dates: FileDates | any, isoString: boolean = false): FileDates {
        if (isoString) {
            return new FileDates(dates.filedatefrom.toISOString().substring(0, 10), dates.filedateto.toISOString().substring(0, 10));
        } else {
            return dates;
        }
    }

    constructor(
        private formBuilder: FormBuilder,
    ) {
    }

    ngOnInit() {
        const self = this;
        self.initForm();
        self.filter();
    }

    ngOnDestroy() {
        const self = this;
        self.clear(false);
    }

    public filter() {
        const self = this;
        const result: FileDates = self.datesRangeForm.value;
        self.formChanged.emit(DatesRangeComponent.parseFormValue(result, self.isoString));
    }

    public clear(getRequest: boolean = true) {
        const self = this;
        self.datesRangeForm.reset();
        if (getRequest) {
            self.formChanged.emit(null);
        }
    }

    private initForm() {
        const self = this;
        const today = new Date();
        const tomorrow = new Date(today.setDate(today.getDate() + 1));
        self.datesRangeForm = self.formBuilder.group({
            filedatefrom: [today, Validators.required],
            filedateto: [tomorrow, Validators.required],
        });
    }
}
