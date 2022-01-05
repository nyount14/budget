import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodComponent } from './food/food.component';
import { FuelComponent } from './fuel/fuel.component';
import { FunComponent } from './fun/fun.component';
import { AuthComponent } from './auth/auth.component';
import { ModalComponent } from './modal/modal.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'fuel', component: FuelComponent},
  { path: 'food', component: FoodComponent, children: [
    { path: ':modal', component: FoodComponent}],
  },
  { path: 'fun', component: FunComponent},
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
