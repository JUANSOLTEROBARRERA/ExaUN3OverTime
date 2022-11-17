import { Injectable } from '@angular/core';
import { Guest } from '../models/guest';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  private guests: Guest[];

  constructor() {
    
    this.guests = [
      {
        token: "A1111",
        name: "admin",
        telephone: "311-111-11-11",
        f_arrival: "",
        f_leave: "",
        room: "A303"
      }
    ]
   }
   public getGuest(): Guest[]{
    return this.guests;
  }

}
