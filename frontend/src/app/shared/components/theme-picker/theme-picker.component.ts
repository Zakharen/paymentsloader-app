import {Component, OnDestroy, OnInit, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Subscription} from 'rxjs';
import {map, filter} from 'rxjs/operators';

import {DocsSiteTheme, ThemeStorageService} from './theme-storage.service';
import {StyleManagerService} from './style-manager.service';

@Component({
    selector: 'app-theme-picker',
    templateUrl: './theme-picker.component.html',
    styleUrls: ['./theme-picker.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class ThemePickerComponent implements OnInit, OnDestroy {
    currentTheme: DocsSiteTheme;
    private queryParamSubscription = Subscription.EMPTY;

    themes: DocsSiteTheme[] = [
        {
            primary: '#673AB7',
            accent: '#FFC107',
            name: 'deeppurple-amber',
            isDark: false,
        },
        {
            primary: '#3F51B5',
            accent: '#E91E63',
            name: 'indigo-pink',
            isDark: false,
            isDefault: true,
        },
        {
            primary: '#E91E63',
            accent: '#607D8B',
            name: 'pink-bluegrey',
            isDark: true,
        },
        {
            primary: '#9C27B0',
            accent: '#4CAF50',
            name: 'purple-green',
            isDark: true,
        },
    ];

    constructor(
        public styleManager: StyleManagerService,
        private themeStorage: ThemeStorageService,
        private activatedRoute: ActivatedRoute,
    ) {
        const self = this;
        self.installTheme(self.themeStorage.getStoredThemeName());
    }

    ngOnInit() {
        const self = this;
        self.queryParamSubscription = self.activatedRoute.queryParamMap
            .pipe(map(params => params.get('theme')), filter(Boolean))
            .subscribe(themeName => self.installTheme(themeName));
    }

    ngOnDestroy() {
        this.queryParamSubscription.unsubscribe();
    }

    installTheme(themeName: string) {
        const self = this;
        const theme = self.themes.find(currentTheme => currentTheme.name === themeName);

        if (!theme) {
            return;
        }

        self.currentTheme = theme;

        if (theme.isDefault) {
            self.styleManager.removeStyle('theme');
        } else {
            self.styleManager.setStyle('theme', `assets/${theme.name}.css`);
        }

        if (self.currentTheme) {
            self.themeStorage.storeTheme(self.currentTheme);
        }
    }

}
