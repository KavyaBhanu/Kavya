import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdernowPageRoutingModule } from './ordernow-routing.module';

import { OrderNowPage } from './ordernow.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdernowPageRoutingModule
  ],
  declarations: [OrderNowPage]
})
export class OrdernowPageModule {}
