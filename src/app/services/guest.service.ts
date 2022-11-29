import { Guest } from '../models/guest';
import { Injectable } from '@angular/core';
import { Room } from '../models/room';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore' 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GuestService {
  private guests: Guest[];
  public rooms: Room[];
  private loggedAs: string;
  public language: number;
  public position: number;
  

  constructor(private router: Router,private firestore: AngularFirestore) {
    
    this.language = 1;
    this.rooms = [
      {
        room: 'A101',
        f_noDisp: [{ years: '2022', months: '11', date: '27' },
                  { years: '2022', months: '11', date: '28' }]
      },
      {
        room: 'A102',
        f_noDisp: [{ years: '2022', months: '11', date: '17' }]
      },
      {
        room: 'A103',
        f_noDisp: [{ years: '2022', months: '11', date: '17' }]
      },
      {
        room: 'A104',
        f_noDisp: [{ years: '2022', months: '11', date: '17' }]
      },
      {
        room: 'A105',
        f_noDisp: [{ years: '2022', months: '11', date: '17' }]
      },
      {
        room: 'A201',
        f_noDisp: [{ years: '2022', months: '11', date: '17' }]
      },
      {
        room: 'A202',
        f_noDisp: [{ years: '2022', months: '11', date: '17' }]
      },
      {
        room: 'A203',
        f_noDisp: [{ years: '2022', months: '11', date: '17' }]
      },
      {
        room: 'A204',
        f_noDisp: [{ years: '2022', months: '11', date: '17' }]
      },
      {
        room: 'A205',
        f_noDisp: [{ years: '2022', months: '11', date: '17' }]
      },
      {
        room: 'B101',
        f_noDisp: [{ years: '2022', months: '11', date: '23' }]
      },
      {
        room: 'B102',
        f_noDisp: [{ years: '2022', months: '11', date: '17' }]
      },
      {
        room: 'B103',
        f_noDisp: [{ years: '2022', months: '11', date: '17' }]
      },
      {
        room: 'B104',
        f_noDisp: [{ years: '2022', months: '11', date: '17' }]
      },
      {
        room: 'B105',
        f_noDisp: [{ years: '2022', months: '11', date: '17' }]
      },
      {
        room: 'B201',
        f_noDisp: [{ years: '2022', months: '11', date: '23' }]
      },
      {
        room: 'B202',
        f_noDisp: [{ years: '2022', months: '11', date: '17' }]
      },
      {
        room: 'B203',
        f_noDisp: [{ years: '2022', months: '11', date: '17' }]
      },
      {
        room: 'B204',
        f_noDisp: [{ years: '2022', months: '11', date: '17' }]
      },
      {
        room: 'B205',
        f_noDisp: [{ years: '2022', months: '11', date: '17' }]
      },
    ];
    this.guests = [
      {
        token: '11111',
        name: 'admin',
        telephone: '+52 311-111-11-11',
        room: 'A203',
        rol: 'admin',
        accesscode: 9998,
        n_days: 3,
        advance: 100,
        room_price: 500,
      },
      {
        token: '21111',
        name: 'Magdalena Morfin',
        telephone: ' +52 311-118-32-72',
        f_arrival2: '2022-11-23',
        f_leave2: '2022-11-24',
        room: 'B201',
        accesscode: 1421,
        n_days: 1,
        advance: 100,
        room_price: 400,
      },
      {
        token: '31111',
        name: 'Axel Lopez Renteria',
        telephone: '+52 311-340-39-43',
        f_arrival2: '2022-11-27',
        f_leave2: '2022-11-29',
        room: 'A101',
        accesscode: 1234,
        n_days: 2,
        advance: 100,
        room_price: 900,
      },
      {
        token: '41111',
        name: 'Juan Antonio Soltero Barrera',
        telephone: '+52 311-300-19-17',
        f_arrival2: '2022-11-23',
        f_leave2: '2022-11-24',
        room: 'B101',
        accesscode: 6854,
        n_days: 1,
        advance: 500,
        room_price: 0,
      },
    ];
  }

  public newGuest(guest: Guest): void {
    this.guests.push(guest);
    console.log(this.guests);

    this.router.navigate(['/reservations']);
  }

  public updateReservation(pos: number) {
    this.guests[pos].room_price = 0;
  }
  public getPositionRes(cn: string): boolean {
    let flag = false;
    for (let i = 0; i <= this.guests.length - 1; i++) {
      if (cn === this.guests[i].token) {
        flag = true;
        this.position = i;
        return flag;
      } else {
        flag = false;
      }
    }
    return flag;
  }

  public getPosition(cn: string): boolean {
    let flag = false;
    for (let i = 0; i <= this.rooms.length - 1; i++) {
      if (cn === this.rooms[i].room) {
        flag = true;
        this.position = i;
        return flag;
      } else {
        flag = false;
      }
    }
    return flag;
  }

  public getToken(): string {
    return this.loggedAs;
  }

  public selectLanguage(ln: number) {
    this.language = ln;
  }

  public getLanguage(): number {
    return this.language;
  }

  public getRooms(): Room[] {
    return this.rooms;
  }

  public logged(user: string) {
    this.loggedAs = user;
  }
  public currentUser(): string {
    return this.loggedAs;
  }

  public getGuest(): Guest[] {
    return this.guests;
  }

  public getGuest2(): Observable<Guest[]> {
    return this.firestore.collection('guests').snapshotChanges().pipe(
      map(actions => {
        return actions.map (a=>{
            const data = a.payload.doc.data() as Guest;
            const id = a.payload.doc.id;
            return { id, ...data };
        });
      })
    );
  }

  public searchToken(token: string, admin: string): boolean {
    let bandera = false;
    for (let i = 0; i <= this.guests.length - 1; i++) {
      if (token === this.guests[i].token && admin === this.guests[i].rol) {
        bandera = true;
        return bandera;
      } else {
        bandera = false;
      }
    }
    return bandera;
  }

  public searchTokenExisting(token: string): boolean {
    let bandera = false;
    for (let i = 0; i <= this.guests.length - 1; i++) {
      if (token === this.guests[i].token) {
        bandera = true;
        localStorage.setItem('name', this.guests[i].name);
        return bandera;
      } else {
        bandera = false;
      }
    }
    return bandera;
  }

  public getGuestByToken(token: string): Guest {
    let item: Guest = this.guests.find((student) => {
      return student.token === token;
    });
    return item;
  }

  public removeGuest(pos: number): Guest[] {
    this.guests.splice(pos, 1);
    return this.guests;
  }
}
