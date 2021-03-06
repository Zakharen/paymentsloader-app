import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

    constructor(
        private translate: TranslateService,
    ) {
    }

    ngOnInit() {
    }

    // TODO: used in case to change languages
    switchLanguage(language: string) {
        this.translate.use(language);
    }
}
