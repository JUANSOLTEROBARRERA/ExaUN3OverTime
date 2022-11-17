import { Component, OnInit } from '@angular/core';
import { Guest } from '../models/guest';
import { GuestService } from '../services/guest.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.page.html',
  styleUrls: ['./reservations.page.scss'],
})
export class ReservationsPage implements OnInit {

  public reservations: Guest [];

  constructor(private guestService: GuestService) {
    this.reservations = this.guestService.getGuest();
  }

  ngOnInit() {
  }

}
