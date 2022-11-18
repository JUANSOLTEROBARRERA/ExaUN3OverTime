import { Component, OnInit } from '@angular/core';

import { Guest } from '../models/guest';
import { GuestService } from '../services/guest.service';
import { ModalComponent } from './../tab1/modal/modal.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  public guest: Guest;
  public guests: Guest[];
  public token: string;
  public accesscode: number;
  public today: string;

  public todays: string[];

  public f_inicio: string[];
  public f_fin: string[];
  public mayor1: boolean;
  public mayor2: boolean;
  public inicio: string;

  public currentLanguage: number;
  public text1: string[];
  public currenttext1: string;
  public text2: string[];
  public currenttext2: string;
  public text3: string[];
  public currenttext3: string;
  public text4: string[];
  public currenttext4: string;
  public text5: string[];
  public currenttext5: string;
  public text6: string[];
  public currenttext6: string;
  public text7: string[];
  public currenttext7: string;

  constructor(
    private guestService: GuestService,
    private modalController: ModalController
  ) {
    this.languageSelection();

    this.guests = this.guestService.getGuest();
    this.token = this.guestService.getToken();
    console.log(this.guests);
    console.log(this.token);
    let item: Guest;
    item = this.guests.find((guests) => {
      return guests.token == this.token;
    });
    this.inicio = item.f_arrival2;
    console.log(item.accesscode);
    this.accesscode = item.accesscode;

    this.today = this.formatDate(new Date());
    console.log(this.today);

    this.todays = this.today.split('-');
    console.log(this.todays);

    this.f_inicio = item.f_arrival2.split('-');
    console.log(this.f_inicio);

    this.f_fin = item.f_leave2.split('-');
    console.log(this.f_fin);

    this.mayor1 = this.validarfechas(this.todays, this.f_inicio);
    console.log(this.mayor1);
    this.mayor2 = this.validarfechas(this.f_fin, this.todays);
    console.log(this.mayor2);

    this.currentLanguage = this.guestService.getLanguage();
    this.text1 = ['Código de acceso', 'Access code', "Code d'accès"];
    this.text2 = [
      'El código de acceso es la clave de la caja fuerte que contiene la llave de su habitación.',
      'The access code is the key to the safe that contains your room key.',
      "Le code d'accès est la clé du coffre-fort qui contient la clé de votre chambre.",
    ];
    this.text3 = ['Código: ', 'Code: ', 'Code: '];
    this.text4 = [
      'Código de acceso no disponible',
      'Access code not available',
      "Code d'accès non disponible",
    ];
    this.text5 = [
      'Favor de regresar el día',
      'Please return on',
      'Veuillez revenir le',
    ];
    this.text6 = ['del mes', 'of the month', 'du mois'];
    this.text7 = ['del año', 'of the year', "de l'année"];
    this.changeLanguage(this.currentLanguage);
  }

  public changeLanguage(ln: number) {
    this.guestService.selectLanguage(ln);
    this.currenttext1 = this.text1[ln];
    this.currenttext2 = this.text2[ln];
    this.currenttext3 = this.text3[ln];
    this.currenttext4 = this.text4[ln];
    this.currenttext5 = this.text5[ln];
    this.currenttext6 = this.text6[ln];
    this.currenttext7 = this.text7[ln];
  }

  public padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  public formatDate(date: Date) {
    return [
      date.getFullYear(),
      this.padTo2Digits(date.getMonth() + 1),
      this.padTo2Digits(date.getDate()),
    ].join('-');
  }

  public validarfechas(a: string[], b: string[]): boolean {
    let cadena = a;
    let cadena2 = b;

    if (parseInt(cadena[0]) > parseInt(cadena2[0])) {
      return true;
    } else if (parseInt(cadena[1]) > parseInt(cadena2[1])) {
      return true;
    } else if (parseInt(cadena[2]) >= parseInt(cadena2[2])) {
      return true;
    }
    return false;
  }

  async languageSelection() {
    const modal = await this.modalController.create({
      component: ModalComponent,
    });
    modal.onDidDismiss().then((res) => {
      if (res.data) this.changeLanguage(res.data.seleccion);
    });
    return modal.present();
  }

  ngOnInit() {
    console.log('hola');
  }
}
