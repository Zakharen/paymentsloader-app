import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../../auth';

@Injectable({
    providedIn: 'root'
})
export class CredentialsGuard implements CanActivate {
    constructor(
        private router: Router,
    ) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const self = this;
        const userCredential = AuthService.userCredentials();
        if (userCredential === 'admin') {
            // authorised so return true
            return true;
        }
        // if no permission to access, then go to dashboard
        self.router.navigate(['/dashboard']);
        return false;
    }
}
