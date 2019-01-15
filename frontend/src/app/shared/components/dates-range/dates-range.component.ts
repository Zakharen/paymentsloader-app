import {Component, OnInit, EventEmitter, Output, OnDestroy, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FileDates} from './models/';
import {PaymentsService} from '../../../payments/payments.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import * as moment from 'moment';
import {environment} from '../../../../environments/environment';
import {TranslateService} from '@ngx-translate/core';

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

    private unsubscribe: Subject<void> = new Subject();

    public static parseFormValue(dates: FileDates | any, isoString: boolean = false): FileDates {
        if (isoString) {
            const from = moment(dates.filedatefrom).format(environment.dateTime.apiIsoFormat);
            const to = moment(dates.filedateto).format(environment.dateTime.apiIsoFormat);
            return new FileDates(from, to);
        } else {
            return dates;
        }
    }

    constructor(
        private formBuilder: FormBuilder,
        private paymentsService: PaymentsService,
        private translate: TranslateService,
    ) {
        const self = this;
        self.paymentsService
            .paymentsUpdateAnnounced$
            .pipe(takeUntil(self.unsubscribe))
            .subscribe(
            status => {
                if (status) {
                    self.filter();
                }
            }
        );
        translate.setDefaultLang('ua');
    }

    ngOnInit() {
        const self = this;
        self.initForm();
        self.filter();
    }

    ngOnDestroy() {
        const self = this;
        self.clear(false);
        self.unsubscribe.next();
        self.unsubscribe.complete();
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
