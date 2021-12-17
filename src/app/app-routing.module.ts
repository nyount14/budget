import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodComponent } from './food/food.component';
import { FuelComponent } from './fuel/fuel.component';
import { FunComponent } from './fun/fun.component';

const routes: Routes = [
  { path: 'fuel', component: FuelComponent},
  { path: 'food', component: FoodComponent},
  { path: 'fun', component: FunComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
