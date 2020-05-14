import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { Store } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  suscription: Subscription;
  editMode = false;
  editedItem: Ingredient;
  @ViewChild('editForm') shoppListEditForm: NgForm;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.suscription = this.store.select('shoppingList')
    .subscribe( stateData => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.shoppListEditForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      } else {
        this.editMode = false;
      }
    });
  }
  ngOnDestroy() {
    this.suscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StoptEdit());
  }
  onSubmitItem(form: NgForm) {
    if (this.editMode) {
        this.store.dispatch(new ShoppingListActions.UpdateIngredient({
          newIngredient: new Ingredient(form.value.name, form.value.amount)}
        ));
    } else {
        this.store.dispatch(new ShoppingListActions.AddIngredient(
          new Ingredient(form.value.name, form.value.amount)
        ));
    }
    this.onClear();
  }
  onClear() {
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StoptEdit());
    this.shoppListEditForm.reset();
  }
  onDelete() {
    this.store.dispatch(
      new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }
}
