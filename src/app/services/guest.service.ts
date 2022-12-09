import { Guest } from '../models/guest';
import { Injectable } from '@angular/core';
import { Room } from '../models/room';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs';
import { ActivatedRoute, ActivationEnd } from '@angular/router';
import { createMockUserToken } from '@firebase/util';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { resolve } from 'dns';


@Injectable({
  providedIn: 'root',
})
export class GuestService {
  private guests: Guest[];
  public rooms: Room[];
  private loggedAs: string;
  public language: number;
  public position: number;


  constructor(private angularFireStorage: AngularFireStorage, private activatedRoute: ActivatedRoute, private router: Router, private firestore: AngularFirestore) {

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

    this.getGuest2().subscribe(res => {
      this.guests = res;
    });

  }

  public actualizarfecha = 0;
  public cuantas = 0;

  public bloquearFechas(a: string[], id: string) {

    //console.log("ID:"+id)

    let cuarto

    this.activatedRoute.queryParams.subscribe((params) => {
      this.getRoomById(id).subscribe(item => {
        //console.log(item);
        cuarto = item as Room;

        if (this.actualizarfecha == 1) {
          //console.log("tengo: "+ cuarto.f_noDisp)
          //console.log("total: "+ cuarto.f_noDisp.length+" fechas.")
          let tengofechas = cuarto.f_noDisp

          for (let i = 0; i < a.length; i++) {
            tengofechas.push(a[i])
          }

          //console.log("Y ahora: "+tengofechas)

          this.firestore
            .collection('rooms')
            .doc(id)
            .set(
              { room: cuarto.room, f_noDisp: tengofechas }
            )
          this.actualizarfecha = 0;
          this.cuantas--;
        }

      });
    });

  }

  public blockedDates(id: string) {
    //let collection = this.firestore.collection('rooms');

    //console.log(this.getRoomById(id));
  }

  public getRoomById(id: string) {
    let result = this.firestore.collection('rooms').doc(id).valueChanges();
    return result;
  }

  public getGuestById(id: string) {
    let result = this.firestore.collection('guests').doc(id).valueChanges();
    return result;
  }

  public newGuest(guest: Guest): void {
    //this.guests.push(guest);
    //console.log(this.guests);
    this.firestore.collection('guests').add(guest);

    this.router.navigate(['/reservations']);
  }

  public updateReservation(pos: number) {
    this.guests[pos].room_price = 0;
  }

  //public blockedDates(pos:number, fechas:any){
  //  this.firestore.collection('guests').doc()
  // }

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

  public getFNoDispById(id: string) {
    let result = this.firestore.collection('rooms').doc(id).valueChanges();
    return result;
  }

  public getRooms(): Observable<Room[]> {
    //return this.rooms;
    return this.firestore.collection('rooms').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Guest;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  public logged(user: string) {
    this.loggedAs = user;
    console.log(user);
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
        return actions.map(a => {
          const data = a.payload.doc.data() as Guest;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  public searchToken(token: string, admin: string): boolean {
    let bandera = false;
    console.log(this.guests)
    console.log(this.guests.length)
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
        localStorage.setItem('photo', this.guests[i].photo);
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


  //GUARDAR IMAGENES EN STORAGE DE FIREBASE

  public location = 'uploads/'

  imageName() {
    let newTime = Math.floor(Date.now() / 1000);
    return Math.floor(Math.random() * 20) + newTime;
  }

  async storeImage(imageData: any) {
    try {
      const imageName = this.imageName();
      return new Promise((resolve, reject) => {

        const pictureRef = this.angularFireStorage.ref(this.location + imageName)

        pictureRef
          .put(imageData)
          .then(function () {
            pictureRef.getDownloadURL().subscribe((url: any) => {
              resolve(url);
            });
          }).catch((error) => {
            reject(error);
          });

      });
    } catch (e) {

    }
  }

  //SUBIR IMAGEN TOMADA CON LA CAMARA
  async storeImage2(imageData: File) {
    try {
      //const imageName = this.imageName();
      let imageName1:string = imageData.name;
      let dividir = imageName1.split('.');
      let imageName = dividir[0];
      
      return new Promise((resolve, reject) => {

        const pictureRef = this.angularFireStorage.ref(this.location + imageName)

        pictureRef
          .put(imageData)
          .then(function () {
            pictureRef.getDownloadURL().subscribe((url: any) => {
              resolve(url);
            });
          }).catch((error) => {
            reject(error);
          });

      });
    } catch (e) {

    }
  }
}
