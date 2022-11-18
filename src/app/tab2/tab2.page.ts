import { Component } from '@angular/core';
import { GuestService } from '../services/guest.service';
import { Guest } from '../models/guest';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  
  public guest: Guest;
  public guests: Guest[];
  public token: string;

 constructor(private guestService: GuestService) {
   this.guests = this.guestService.getGuest();
   this.token = this.guestService.getToken();
   console.log(this.guests);
   console.log(this.token);
    let item: Guest;
    item = this.guests.find(
      (guests) => {
        return guests.token == this.token;
      }
    );
      console.log(item);
  }

  
}
