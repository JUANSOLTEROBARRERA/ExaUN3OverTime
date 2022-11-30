import { Component, OnInit } from '@angular/core';
import { GuestService } from '../services/guest.service';
import { ActivatedRoute } from '@angular/router';
import { Guest } from '../models/guest';

@Component({
  selector: 'app-view-reservation',
  templateUrl: './view-reservation.page.html',
  styleUrls: ['./view-reservation.page.scss'],
})
export class ViewReservationPage implements OnInit {

  public guest: Guest;

  constructor(private activatedRoute: ActivatedRoute, private guestService: GuestService) {
    this.guest = {
      name: "",
      telephone: "",
      f_arrival2: "",
      f_leave2: "",
      room: "",
      token: "",
      rol: "",
      accesscode: 0,
      n_days: 0,
      room_price: 0,
      advance: 0,
      id: ""
    };
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.guestService.getGuestById(params.id).subscribe(item => {
        console.log(item);
        this.guest = item as Guest;
      });
    });
  }

}
