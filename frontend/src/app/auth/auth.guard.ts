import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const self = this;
        const isUserLogged = self.authService.loggedIn;
        if (isUserLogged) {
            // authorised so return true
            return true;
        }
        // not logged in so redirect to login page with the return url
        self.router.navigate(['/auth']);
        return false;
    }
}
