import { Component, OnInit, OnDestroy} from '@angular/core';
import { Recipe } from '../recipe.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipesChangeSubs: Subscription;
  constructor(
    private router: Router, private aRouter: ActivatedRoute,
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.recipesChangeSubs = this.store.select('recipes')
    .pipe(map(recipeState => recipeState.recipes))
    .subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
  }
  ngOnDestroy() {
    this.recipesChangeSubs.unsubscribe();
  }
  addRecipe() {
    this.router.navigate(['new'], {relativeTo: this.aRouter});
  }
}
