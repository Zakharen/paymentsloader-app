import {Component, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';
import {MediaMatcher} from '@angular/cdk/layout';
import {AuthService} from '../auth';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {

    mobileQuery: MediaQueryList;
    public isAdmin = AuthService.userCredentials() === 'admin';

    private _mobileQueryListener: () => void;

    constructor(
        changeDetectorRef: ChangeDetectorRef,
        media: MediaMatcher,
        private router: Router,
        private translate: TranslateService,
    ) {
        translate.setDefaultLang('ua');

        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    public logout() {
        const self = this;
        AuthService.logout();
        self.router.navigate(['/auth']);
    }
}
