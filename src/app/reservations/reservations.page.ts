import { Component, OnInit } from '@angular/core';
import { Guest } from '../models/guest';
import { GuestService } from '../services/guest.service';
import { Router } from '@angular/router';
import { AlertController } from "@ionic/angular";

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.page.html',
  styleUrls: ['./reservations.page.scss'],
})
export class ReservationsPage implements OnInit {

  public reservations: Guest [];
  public message: string;

  constructor(private guestService: GuestService, private router: Router, private alertController: AlertController) {
    this.reservations = this.guestService.getGuest();
  }

  public getPhone(pos:number):string{
    let replace: string;
    replace = this.reservations[pos].telephone.replaceAll("-","").replaceAll(" ","").replaceAll("+","");
    this.message = `https://wa.me/${replace}?text=Su%20Token%20es%3A%20${this.reservations[pos].token}`
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
          handler: ()=> {
            
          }
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: ()=> {
            this.reservations = this.guestService.removeGuest(pos);
          }
        }
      ]
    });

    await alert.present();

  }

  ngOnInit() {
  }

}
