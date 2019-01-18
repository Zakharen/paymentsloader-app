import {Component, Inject, OnInit, Optional} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {EditPaymentService} from './edit-payment.service';
import {Dbf} from "../../models";

@Component({
    selector: 'app-edit-payment',
    templateUrl: './edit-payment.component.html',
    styleUrls: ['./edit-payment.component.scss']
})
export class EditPaymentComponent implements OnInit {

    public form: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<EditPaymentComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) public data: Dbf,
        private formBuilder: FormBuilder,
        private editPaymentService: EditPaymentService,
    ) {
    }

    ngOnInit() {
        this.initPrePaymentForm(this.data.NAZN);
    }

    public cancel() {
        this.dialogRef.close('NoChanges');
    }

    public save() {
        const self = this;
        // stop here if form is invalid
        if (self.form.invalid) {
            return;
        }
        // noChanges
        if (self.data.NAZN === self.form.controls['narrative'].value) {
            self.cancel();
        } else {
            self.data.NAZN = self.form.controls['narrative'].value;
            self.editPaymentService
                .updateDBF(self.data)
                .subscribe(
                    res => self.dialogRef.close('OK'),
                    err => self.dialogRef.close('NOK')
                );
        }
    }

    private initPrePaymentForm(narrative: string = '') {
        const self = this;
        self.form = self.formBuilder.group({
            narrative: [narrative, Validators.required],
        });
    }
}
