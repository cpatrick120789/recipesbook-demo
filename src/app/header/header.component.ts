import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authUserSuscrip: Subscription;
  isUserAuth = false;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.authUserSuscrip = this.store.select('auth')
    .pipe(map( authState => {
      return authState.user;
    }))
    .subscribe(
      user => {
        this.isUserAuth = !user ? false : true;
        console.log('isUserAuth value: ' + this.isUserAuth);
      }
    );
  }

  ngOnDestroy() {
    this.authUserSuscrip.unsubscribe();
  }

  onSave() {
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  onFetchRecipes() {
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  logOut() {
    this.store.dispatch(new AuthActions.Logout());
  }
}
