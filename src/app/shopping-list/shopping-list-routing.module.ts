import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list.component';

const shoppListRoutes: Routes = [
  { path: '', component: ShoppingListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(shoppListRoutes)],
  exports: [RouterModule]
})
export class ShoppingListRoutingModule {}
