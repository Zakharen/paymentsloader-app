import {Component, OnDestroy, OnInit, Inject, Optional} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {PrePaymentService} from './pre-payment.service';
import {Account, Payment} from '../../models';

@Component({
    selector: 'app-pre-payment',
    templateUrl: './pre-payment.component.html',
    styleUrls: ['./pre-payment.component.scss']
})
export class PrePaymentComponent implements OnInit, OnDestroy {

    public form: FormGroup;
    public accounts: Account[] = [];
    public accountsList: any[] = [];
    private unsubscribe: Subject<any> = new Subject<any>();

    constructor(
        public dialogRef: MatDialogRef<PrePaymentComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) public data: Payment[],
        private formBuilder: FormBuilder,
        private prePaymentService: PrePaymentService,
    ) {
    }

    ngOnInit() {
        this.initPrePaymentForm();
        this.getPaymentsAccounts();
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    cancel() {
        const self = this;
        self.form.reset();
        self.dialogRef.close();
    }

    generate() {
        const self = this;
        // stop here if form is invalid
        if (self.form.invalid) {
            return;
        }
        const payload = {
            templateId: self.form.controls['templateId'].value,
            narrative: self.form.controls['narrative'].value,
            ids: self.data.map((payment: Payment) => {
                return {ID: payment.Id};
            }),
        };
        self.prePaymentService
            .createPayment(payload)
            .pipe(takeUntil(self.unsubscribe))
            .subscribe(
                res => self.dialogRef.close('OK'),
                err => self.dialogRef.close('NOK')
            );
    }

    private getPaymentsAccounts() {
        const self = this;
        self.prePaymentService
            .getAccounts()
            .pipe(takeUntil(self.unsubscribe))
            .subscribe((res: Account[]) => {
                self.accounts = res;
                try {
                    self.accountsList = res.map((account: Account) => {
                        return {
                            account: account.Account,
                            templateId: account.Id,
                        };
                    });
                } catch (e) {
                    console.log('ERROR: Parsing accounts select list data source.');
                }
            });
    }

    private initPrePaymentForm() {
        const self = this;
        self.form = self.formBuilder.group({
            narrative: ['', Validators.required],
            templateId: ['', Validators.required],
        });
    }
}
