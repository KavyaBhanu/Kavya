import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DineoutPageRoutingModule } from './dineout-routing.module';

import { DineoutPage } from './dineout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DineoutPageRoutingModule
  ],
  declarations: [DineoutPage]
})
export class DineoutPageModule {}
