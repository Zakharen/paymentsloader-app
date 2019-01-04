import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdminService} from './admin.service';
import {first} from "rxjs/operators";

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

    constructor(
        private formBuilder: FormBuilder,
        private adminService: AdminService,
    ) {
    }

    ngOnInit() {
        const self = this;
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
        // Todo: add user
        debugger;
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        this.adminService.addUser(this.registerForm.value)
            .pipe(first())
            .subscribe(
                result => {
                    debugger
                },
                err => console.log(err)
            );
    }

    cancelAddUser() {
        const self = this;
        // Todo: clear form
        self.setStep(0);
    }

    getErrorMessage() {
        const self = this;
        return self.registerForm.controls.email.hasError('required') ? 'You must enter a value' :
            self.registerForm.controls.email.hasError('email') ? 'Not a valid email' :
                '';
    }
}
