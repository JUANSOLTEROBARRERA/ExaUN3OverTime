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
        room: "A303",
        rol: "admin"
      },
      {
        token: "B1111",
        name: "Juan Antonio Soltero Barrera",
        telephone: "311-118-32-72",
        f_arrival: "",
        f_leave: "",
        room: "B301"
      },
      {
        token: "C1111",
        name: "Axel Lopez Renteria",
        telephone: "311-203-14-43",
        f_arrival: "",
        f_leave: "",
        room: "A101"
      }
    ]
   }
   public getGuest(): Guest[]{
    return this.guests;
  }

  public searchToken(token: string, admin:string): boolean{
    let bandera = false;
    for(let i = 0; i<=this.guests.length-1;i++){
      if(token === this.guests[i].token && admin===this.guests[i].rol){    
           bandera = true;
           return bandera;
       }else{
        bandera = false;
       }   
    }
    return bandera;
  }

}
