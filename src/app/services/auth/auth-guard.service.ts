import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  	constructor(private authService: AuthService, private router: Router) {}

  	canActivate(
    	next: ActivatedRouteSnapshot,
    	state: RouterStateSnapshot
  	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    	return this.authService.isAuthenticated().pipe(
      		tap((isAuthenticated: boolean) => {
        		if (!isAuthenticated) {
          			// User is not authenticated, redirect to login page
          			this.router.navigateByUrl('/connexion');
        		}
      		})
    	);
  	}
}
