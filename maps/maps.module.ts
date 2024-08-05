// maps.module.ts

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { MapPage } from './maps.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  declarations: [MapPage]
})
export class MapsPageModule {}
