import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  NumberValueAccessor,
  Validators,
} from '@angular/forms';

import { Guest } from '../models/guest';
import { GuestService } from '../services/guest.service';
import { ModalComponent } from './../tab1/modal/modal.component';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  public validationMessages: Object;
  public myForm: FormGroup;
  public pendiente: number;
  public guest: Guest;
  public guests: Guest[];
  public token: string;
  public accesscode: number;
  public today: string;
  private currentToken: string;

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
  public name: string;
  public text8: string[];

  public text9: string[];
  public text10: string[];
  public text11: string[];

  public text12: string[];
  public text13: string[];

  public text14: string[];
  public text15: string[];
  public text16: string[];
  public text17: string[];
  public text18: string[];
  public text19: string[];
  public text20: string[];
  public text21: string[];

  public text22: string[];
  public text23: string[];

  

  constructor(
    private guestService: GuestService,
    private modalController: ModalController,
    private router: Router,
    private fb: FormBuilder,
    private toastController: ToastController
  ) {
    this.name = localStorage.getItem('name');
    let auxi = this.name.split(' ');

    this.name = auxi[0];

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
    this.text8 = ['Holla', 'Hello', 'Salut'];
    this.text9 = ['Pago Pendiente', 'Pending payment', 'Impayé'];
    this.text10 = [
      'Tienes un pago pendiente de: ',
      'You have a pending payment of:',
      'Vous avez un paiement en attente de :',
    ];
    this.text11 = ['Pagar', 'Pay', 'Payer'];
    this.text12 = [
      'Código de acceso no disponible',
      'Access code not available',
      "Code d'accès non disponible",
    ];
    this.text13 = [
      'No podrá obtener su codigo de acceso hasta que se cubra el costo total de la reservación.',
      'You will not be able to obtain your access code until the total cost of the reservation is covered.',
      "Vous ne pourrez pas obtenir votre code d'accès tant que le coût total de la réservation n'aura pas été couvert.",
    ];
    this.text14 = ['Pendiente:', 'Earring', "Boucle d'oreille"];
    this.text15 = ['Tarjeta', 'Card', 'Carte'];
    this.text16 = ['CVV', 'CVV', 'CVV'];
    this.text17 = ['Válida hasta', 'Valid until', 'Valid until jusque'];

    this.text18 = ['Pagar', 'Pay', 'Payer'];

    this.text19 = [
      'Pago realizado con éxito!',
      'Payment made successfully!',
      'Paiement effectué avec succès !',
    ];
    this.text20 = ['Cerrar', 'Close', 'Fermer'];

    this.text21 = [
      'Ningún pago pendiente.',
      'No pending payment.',
      'Aucun paiement en attente.',
    ];
    this.text22 = [
      'Fecha Límite:',
      'Deadline:',
      'Date limite:',
    ];
    this.text23 = [
      'día',
      'day',
      'jour',
    ];
    this.changeLanguage(this.currentLanguage);

    //console.log(this.guest)
    this.pendiente = item.room_price;

    this.currentToken = item.token;
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

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.text19[this.currentLanguage],
      duration: 3000,
      cssClass: 'custom-toast',
      buttons: [
        {
          text: this.text20[this.currentLanguage],
        },
      ],
    });

    await toast.present();
  }
  public pay() {
    if (
      this.myForm.controls.card.valid &&
      this.myForm.controls.cvv.valid &&
      this.myForm.controls.fecha.valid
    ) {
      this.guestService.getPositionRes(this.currentToken);
      let posicion = this.guestService.position;

      this.guestService.updateReservation(posicion);

      this.guests = this.guestService.getGuest();

      this.pendiente = 0;

      this.presentToast();
    }
  }

  public goLogin() {
    this.router.navigate(['/login']);
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

  ngOnInit() {
    this.myForm = this.fb.group({
      card: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            '[0-9][0-9][0-9][0-9][-]?[0-9][0-9][0-9][0-9][-]?[0-9][0-9][0-9][0-9][-]?[0-9][0-9][0-9][0-9]'
          ),
        ]),
      ],
      cvv: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(3),
          Validators.pattern('[0-9][0-9][0-9]'),
        ]),
      ],
      fecha: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[0-9][0-9][/][0-9][0-9]'),
        ]),
      ],
    });

    this.validationMessages = {
      card: [
        {
          type: 'required',
          message: [
            'Número de tarjeta obligatorio.',
            'Mandatory card number.',
            'Numéro de carte obligatoire.',
          ],
        },
        {
          type: 'pattern',
          message: [
            'Número de tarjeta mal formado',
            'Malformed card number',
            'Numéro de carte mal formé',
          ],
        },
      ],
      cvv: [
        {
          type: 'required',
          message: ['CVV obligatorio.', 'Mandatory CVV.', 'CVV obligatoire.'],
        },
        {
          type: 'pattern',
          message: ['CVV mal formado.', 'Malformed CVV.', 'CVV mal formé.'],
        },
        {
          type: 'minlength',
          message: [
            'EL CVV es de 3 digitos.',
            'CVV is 3 digits.',
            'Le CVV est composé de 3 chiffres.',
          ],
        },
        {
          type: 'maxlength',
          message: [
            'EL CVV es de 3 digitos.',
            'CVV is 3 digits.',
            'Le CVV est composé de 3 chiffres.',
          ],
        },
      ],
      fecha: [
        {
          type: 'required',
          message: [
            'La fecha es obligatoria.',
            'The date is mandatory.',
            'La date est obligatoire.',
          ],
        },
        {
          type: 'pattern',
          message: [
            'Fecha mal formada.',
            'Malformed date.',
            'Date mal formée.',
          ],
        },
      ],
    };
  }
}
