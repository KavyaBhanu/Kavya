import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrderNowPage } from './ordernow.page';

const routes: Routes = [
  {
    path: '',
    component: OrderNowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdernowPageRoutingModule {}
