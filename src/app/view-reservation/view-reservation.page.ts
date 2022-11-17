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

  public guest: Guest

  constructor(private activatedRoute: ActivatedRoute, private guestService: GuestService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.guest = this.guestService.getGuestByToken(params.token);
    });
  }

}
