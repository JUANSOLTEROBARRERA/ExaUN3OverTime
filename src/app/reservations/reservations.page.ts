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
  public message: string;

  constructor(private guestService: GuestService) {
    this.reservations = this.guestService.getGuest();
  }

  public getPhone(pos:number):string{
    let replace: string;
    replace = this.reservations[pos].telephone.replaceAll("-","").replaceAll(" ","").replaceAll("+","");
    this.message = `https://wa.me/${replace}?text=Su%20Token%20es%3A%20${this.reservations[pos].token}`
    return this.message;
  }

  ngOnInit() {
  }

}
