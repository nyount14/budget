import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuelComponent } from './fuel/fuel.component';

const routes: Routes = [
  { path: 'fuel', component: FuelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
