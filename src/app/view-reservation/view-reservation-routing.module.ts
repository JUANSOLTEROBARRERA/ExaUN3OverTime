import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewReservationPage } from './view-reservation.page';

const routes: Routes = [
  {
    path: '',
    component: ViewReservationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewReservationPageRoutingModule {}
