import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { FoodComponent } from './food/food.component';
import { FuelComponent } from './fuel/fuel.component';
import { FunComponent } from './fun/fun.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'main', component: MainComponent },
  { path: 'fuel', component: FuelComponent},
  { path: 'food', component: FoodComponent},
  { path: 'fun', component: FunComponent},
  { path: '', redirectTo: '/main', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
