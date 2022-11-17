import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewReservationPageRoutingModule } from './view-reservation-routing.module';

import { ViewReservationPage } from './view-reservation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewReservationPageRoutingModule
  ],
  declarations: [ViewReservationPage]
})
export class ViewReservationPageModule {}
