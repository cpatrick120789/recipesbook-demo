import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import * as RecipesActions from '../store/recipe.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeSelected: Recipe;
  constructor(
    private recipeServices: RecipeService,
    private aRoute: ActivatedRoute, private router: Router,
    private store: Store<fromApp.AppState>) { }
  id: number;

  ngOnInit() {
    this.aRoute.params
      .pipe(
        map(params => {
          return +params['id'];
        }),
        switchMap(id => {
          this.id = id;
          return this.store.select('recipes');
        }),
        map(recipesState => {
          return recipesState.recipes.find((recipe, index) => {
            return index === this.id;
          });
        })
      )
      .subscribe(recipe => {
        this.recipeSelected = recipe;
      });
  }
  onClickToShoppList() {
    this.store.dispatch(
      new ShoppingListActions.AddIngredients(this.recipeSelected.ingredients)
    );
  }
  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.aRoute});
  }
  onDeleteRecipe() {
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.id));
    this.router.navigate([''], {relativeTo: this.aRoute});
  }
}
