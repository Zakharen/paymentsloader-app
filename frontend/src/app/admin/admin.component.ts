import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdminService} from './admin.service';
import {first} from 'rxjs/operators';
import {RequestHelperService} from '../core/services';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
    public step = 0;
    public roles: any[] = [
        {value: 'user', viewValue: 'User'},
        {value: 'admin', viewValue: 'Administrator'}
    ];
    public registerForm: FormGroup;

    private addUserSuccess: string;
    private addUserError: string;
    private fieldRequired: string;
    private invalidEmail: string;

    constructor(
        private formBuilder: FormBuilder,
        private adminService: AdminService,
        private requestHelper: RequestHelperService,
        private translate: TranslateService,
    ) {
    }

    ngOnInit() {
        const self = this;
        self.translate.get([
            'admin.messages.messages.addUserSuccess',
            'admin.messages.messages.addUserError',
            'admin.messages.messages.fieldRequired',
            'admin.messages.messages.invalidEmail',
        ]).subscribe(value => {
            self.addUserSuccess = value['admin.messages.messages.addUserSuccess'];
            self.addUserError = value['admin.messages.messages.addUserError'];
            self.fieldRequired = value['admin.messages.messages.fieldRequired'];
            self.invalidEmail = value['admin.messages.messages.invalidEmail'];
        });

        self.registerForm = self.formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            type: ['', Validators.required],
        });
    }

    setStep(index: number) {
        const self = this;
        self.step = index;
    }

    addUser() {
        const self = this;
        // stop here if form is invalid
        if (self.registerForm.invalid) {
            return;
        }
        self.adminService.addUser(self.registerForm.value)
            .pipe(first())
            .subscribe(
                result => {
                    self.requestHelper.snackBarSuccess(self.addUserSuccess);
                    self.refreshForm();
                    self.adminService.announceUserWasAdded(true);
                },
                err => {
                    self.requestHelper.snackBarWarning(self.addUserError);
                    console.log(err);
                }
            );
    }

    refreshForm() {
        const self = this;
        self.registerForm.reset();
        self.setStep(0);
    }

    getErrorMessage() {
        const self = this;
        return self.registerForm.controls.email.hasError('required') ? self.fieldRequired :
            self.registerForm.controls.email.hasError('email') ? self.invalidEmail :
                '';
    }
}
