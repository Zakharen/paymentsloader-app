import {Injectable, EventEmitter} from '@angular/core';

export interface DocsSiteTheme {
    name: string;
    accent: string;
    primary: string;
    isDark?: boolean;
    isDefault?: boolean;
}

@Injectable()
export class ThemeStorageService {
    static storageKey = 'docs-theme-storage-current-name';

    onThemeUpdate: EventEmitter<DocsSiteTheme> = new EventEmitter<DocsSiteTheme>();

    storeTheme(theme: DocsSiteTheme) {
        try {
            window.localStorage[ThemeStorageService.storageKey] = theme.name;
        } catch { }

        this.onThemeUpdate.emit(theme);
    }

    getStoredThemeName(): string | null {
        try {
            return window.localStorage[ThemeStorageService.storageKey] || null;
        } catch {
            return null;
        }
    }

    clearStorage() {
        try {
            window.localStorage.removeItem(ThemeStorageService.storageKey);
        } catch { }
    }
}
