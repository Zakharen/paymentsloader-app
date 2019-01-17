import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(
        private translate: TranslateService,
    ) {
        if (localStorage.getItem('lang')) {
            translate.setDefaultLang(localStorage.getItem('lang') || 'ua');
        } else {
            localStorage.setItem('lang', 'ua');
            translate.setDefaultLang('ua');
        }
    }
}
