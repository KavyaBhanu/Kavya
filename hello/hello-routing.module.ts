import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HelloPage } from './hello.page';

const routes: Routes = [
  {
    path: '',
    component: HelloPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelloPageRoutingModule {}
