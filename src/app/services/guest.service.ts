import { Injectable } from '@angular/core';
import { Guest } from '../models/guest';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  private guests: Guest[];
  private loggedAs: string;

  constructor() {
    
    this.guests = [
      {
        token: "11111",
        name: "admin",
        telephone: "+52 311-111-11-11",
        f_arrival: "",
        f_leave: "",
        room: "A303",
        rol: "admin"
      },
      {
        token: "21111",
        name: "Juan Antonio Soltero Barrera",
        telephone: " +52 311-118-32-72",
        f_arrival: "18/11/22",
        f_leave: "19/11/22",
        room: "B301"
      },
      {
        token: "31111",
        name: "Axel Lopez Renteria",
        telephone: "+52 311-340-39-43",
        f_arrival: "19/11/22",
        f_leave: "20/11/22",
        room: "A101"
      },
      {
        token: "41111",
        name: "Yazmin Elizabeth Ochoa Benitez",
        telephone: "+52 311-300-19-17",
        f_arrival: "19/11/22",
        f_leave: "20/11/22",
        room: "K101"
      }
    ]
   }

   public logged(user: string){
    this.loggedAs = user;
   }
   public currentUser():string{
    return this.loggedAs;
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

  public searchTokenExisting(token: string): boolean{
    let bandera = false;
    for(let i = 0; i<=this.guests.length-1;i++){
      if(token === this.guests[i].token){    
           bandera = true;
           return bandera;
       }else{
        bandera = false;
       }   
    }
    return bandera;
  }

  public getGuestByToken(token: string): Guest {
    let item: Guest = this.guests.find((student)=> {
      return student.token===token;
    });
    return item;
  }

  public removeGuest(pos: number): Guest[]{
    this.guests.splice(pos, 1);
    return this.guests;
  }

}
