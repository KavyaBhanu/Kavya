import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DineoutPage } from './dineout.page';

const routes: Routes = [
  {
    path: '',
    component: DineoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DineoutPageRoutingModule {}
