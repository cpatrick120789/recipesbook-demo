import { CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>) {}

  /* TODO: Older approach using tap */
  /* canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot):
  boolean | Promise<boolean> | Observable<boolean> {
    return this.authService.user.pipe(map( user => {
      return !!user;
    }), tap( isAuth => {
      if (!isAuth) {
        this.router.navigate(['/auth']);
      }
    }));
  } */
  /* canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot):
  boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    return this.authService.user.pipe(take(1), map( user => {
      const isAuth = !!user;
      if (isAuth) {
        return true;
      }
      return this.router.createUrlTree(['/auth']);
    }));
  } */
  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot):
  boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    return this.store.select('auth').pipe(
      take(1),
      map( authState => {
        return authState.user;
      }),
      map( user => {
      const isAuth = !!user;
      if (isAuth) {
        return true;
      }
      return this.router.createUrlTree(['/auth']);
    }));
  }
}
