import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {first} from 'rxjs/operators';
import {AuthService} from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

    public email: string;
    public password: string;
    public showSpinner = false;
    public error: string;

    constructor(
        private auth: AuthService,
        private router: Router,
        private translate: TranslateService,
    ) {
        translate.setDefaultLang('ua');
    }

    public login() {
        this.auth.login(this.email, this.password)
            .pipe(first())
            .subscribe(
                result => this.router.navigate(['home']),
                err => this.error = 'Could not authenticate'
            );
    }

}
