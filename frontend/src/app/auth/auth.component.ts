import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {first} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {RequestHelperService} from '../core/services';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

    public email: string;
    public password: string;
    public showSpinner = false;
    public error: string;

    private requestError: string;

    constructor(
        private auth: AuthService,
        private router: Router,
        private translate: TranslateService,
        private requestHelperService: RequestHelperService,
    ) {
    }

    ngOnInit(): void {
        this.translate
            .get('auth.messages.requestError')
            .subscribe(values => this.requestError = values['auth.messages.requestError']);
    }

    public login() {
        this.auth.login(this.email, this.password)
            .pipe(first())
            .subscribe(
                result => this.router.navigate(['home']),
                err => this.requestHelperService.snackBarWarning(this.requestError),
            );
    }

}
