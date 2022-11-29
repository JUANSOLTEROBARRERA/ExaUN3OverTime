import { AlertController, IonFab } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

import { Guest } from '../models/guest';
import { GuestService } from '../services/guest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.page.html',
  styleUrls: ['./reservations.page.scss'],
})
export class ReservationsPage implements OnInit {
  public reservations: Guest[];
  public message: string;
  public rol: boolean;
  public name: string;

  constructor(
    private guestService: GuestService,
    private router: Router,
    private alertController: AlertController
  ) {
    this.name = localStorage.getItem('name');

    let auxi = this.name.split(' ');

    this.name = auxi[0];

    let str1 = this.guestService.currentUser();
    let str2 = 'admin';
    if (str1 !== str2) {
      this.router.navigate(['/login']);
    } else {
    }

    //this.reservations = this.guestService.getGuest();

    this.guestService.getGuest2().subscribe(res => {
      this.reservations = res;
      console.log(this.reservations);
    });
  }

  public addReservation(): void {
    this.router.navigate(['/new-reservation']);
  }
  public goLogin() {
    this.router.navigate(['/login']);
  }

  public getPhone(pos: number): string {
    let replace: string;
    replace = this.reservations[pos].telephone
      .replaceAll('-', '')
      .replaceAll(' ', '')
      .replaceAll('+', '');
    this.message = `https://wa.me/${replace}?text=Su%20Token%20es%3A%20${this.reservations[pos].token}`;
    return this.message;
  }

  public getGuestByToken(token: string): void {
    this.router.navigate(['/view-reservation'], {
      queryParams: { token: token },
    });
  }

  public async removeGuest(pos: number) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      subHeader: '¿Estás seguro que deseas eliminar?',
      message: 'Esto es una confirmación',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => {
            this.reservations = this.guestService.removeGuest(pos);
          },
        },
      ],
    });

    await alert.present();
  }

  ngOnInit() {
    console.log(this.guestService.currentUser());
  }
}
