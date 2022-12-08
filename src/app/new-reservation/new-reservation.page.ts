import { AlertController, IonInput } from '@ionic/angular';
import { Component, OnInit, TestabilityRegistry, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivationEnd } from '@angular/router';

import { Guest } from '../models/guest';
import { GuestService } from '../services/guest.service';
import { Room } from '../models/room';
import { Router } from '@angular/router';
import { Timestamp } from 'rxjs/internal/operators/timestamp';


@Component({
  selector: 'app-new-reservation',
  templateUrl: './new-reservation.page.html',
  styleUrls: ['./new-reservation.page.scss'],
})
export class NewReservationPage implements OnInit {
  public myForm: FormGroup;
  public validationMessages: Object;
  public guest: Guest;
  public today: string;
  public tomorrow: string;
  public rooms: Room[];
  public rooms2: Room[];
  public filteredRooms: Room[] = [];
  public rol: boolean;
  public myDate;
  public validado: Boolean;
  public advance: number;

  public validfecha1: Boolean;
  public validfecha2: Boolean;

  public fechaseleccionada1: string;
  public fechaseleccionada2: string;

  public currId: string;


  @ViewChild('inputname') inputname: IonInput;
  @ViewChild('#inputphone') inputphone: IonInput;

  //Datos para mandar nuevo guest
  public name: string;
  public phone: string;
  public f_arrival2: string;
  public f_leave2: string;
  public rooom2: string;
  public token: string;
  public codacceso: number;

  constructor(
    private guestService: GuestService,
    private fb: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private activatedRoute: ActivatedRoute
  ) {
    this.fechaseleccionada1 = ''
    this.fechaseleccionada2 = ''
    this.validado = false;
    this.validfecha1 = true;
    this.validfecha2 = true;

    let str1 = this.guestService.currentUser();
    let str2 = 'admin';
    if (str1 !== str2) {
      this.router.navigate(['/login']);
    } else {
    }
    this.today = this.formatDate(new Date());
    this.tomorrow = this.formatDate2(new Date());



    this.guestService.getRooms().subscribe(res => {
      this.rooms = res;
    });


    // this.filterRooms();
  }

  public convertir() {
    //for(let i=0; i<this.rooms.length; i++){
    //  for(let j=0; j<this.rooms[i].f_noDisp.length; j++){
    //    this.rooms2[i].f_noDisp[j] = new Date(this.rooms[i].f_noDisp[j]['seconds'] * 1000 + this.rooms[i].f_noDisp[j]['nanoseconds']/1000000)
    //    console.log(this.rooms2[i].f_noDisp[j])
    //  }
    //}
  }


  public validarfecha1() {
    this.validfecha1 = true;
  }
  public validarfecha2() {
    this.validfecha2 = true;
  }

  public contador: number;
  public contador2: number;

  public camposvalidados() {
    this.validado = true;
  }

  public guardarCuarto(room: Room) {
    // var timeStamp= this.currRoom.f_noDisp
    //console.log(room.f_noDisp)

    //for(let i = 0; i<timeStamp.length; i++){
    //  timeStamp[i] = new Date(timeStamp[i]);
    //}
    //console.log(timeStamp[0])

    //var timeStamp2 = timeStamp[0]
    //var dateFormat = new Date(timeStamp2);
    //console.log(dateFormat)
  }

  public currRoom: Room;

  public cambiar() {
    let idseleccionado = this.myForm.controls.room.value.split(" ")
    let cuartoactual = idseleccionado[1]

    let item: Room;
    item = this.rooms.find(
      (Room) => {
        return Room.room == cuartoactual;
      }
    );

    console.log("El item es:" + item.f_noDisp);

    console.log(this.myForm.get('room').value)

    this.current_month_blockout_dates = [{ years: '2022', months: '11', date: '17' }];

    //let fechasparabloquear: string[]
    for (let i = 0; i < item.f_noDisp.length; i++) {
      let separado = item.f_noDisp[i].split("-")
      this.current_month_blockout_dates.push({ years: separado[0], months: separado[1], date: separado[2] })
    }


    this.isBlockedDate = (dateString: string) => {
      const result = this.current_month_blockout_dates.some((date) => {
        let interstitial_date = `${date.years}-${('0' + date.months).slice(-2)}-${date.date
          }`;
        return dateString == interstitial_date;
      });
      if (result === true) {
      }
      return !result;
    };
  }

  current_month_blockout_dates = [{ years: '2022', months: '11', date: '17' }];


  isBlockedDate = (dateString: string) => {
    const result = this.current_month_blockout_dates.some((date) => {
      let interstitial_date = `${date.years}-${('0' + date.months).slice(-2)}-${date.date
        }`;
      // eg. comparing 2022-08-21 with 2022-08-12
      return dateString == interstitial_date;
    });
    if (result === true) {
    }
    return !result;
  };

  public padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  public randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  public newGuestBef(id: string): void {

    if (!this.validaciones()) return;

    let idseleccionado = this.myForm.controls.room.value.split(" ")
    let cuartoactual = idseleccionado[1]

    let item: Room;
    item = this.rooms.find(
      (Room) => {
        return Room.room == cuartoactual;
      }
    );

    let compara1 = item.f_noDisp

    let fechas1 = this.myForm.controls.fecha2.value
    let fechas2 = this.myForm.controls.fecha3.value

    let fecaux1 = fechas1.split("-")
    let fecaux2 = fechas2.split("-")

    let dia1 = fecaux1[2];
    let dia2 = fecaux2[2];

    let cuantos = parseInt(dia2) - parseInt(dia1)

    let auxiliar = parseInt(dia1)

    for (let i = 0; i < item.f_noDisp.length; i++) {
      for (let j = 0; j < cuantos; j++) {
        let suma: number;
        suma = auxiliar + j;
        console.log(item.f_noDisp[i] + " VS " + fecaux1[0] + "-" + fecaux1[1] + "-" + suma);
        if (item.f_noDisp[i] === fecaux1[0] + "-" + fecaux1[1] + "-" + suma) {

          this.alerta10();
          return

        }
      }
    }

    //VALIDAR FECHAS ENTREMEDIO

    let cadenaa = this.myForm.get('fecha2').value.split('-');
    let cadena22 = this.myForm.get('fecha3').value.split('-');

    let cuantass = parseInt(cadena22[2]) - parseInt(cadenaa[2]);

    let variable = parseInt(cadenaa[2]);

    if (this.validarfechas() === false) {

      this.validado = true;
      this.myForm.controls.name.disable();
      this.myForm.controls.phone.disable();
      //this.myForm.controls.fecha2.disable()
      this.fechaseleccionada1 = this.myForm.controls.fecha2.value
      //this.myForm.controls.fecha3.disable()
      this.fechaseleccionada2 = this.myForm.controls.fecha3.value
      this.myForm.controls.room.disable();
    } else {
      this.alerta();
    }

    let cadena = this.myForm.get('fecha2').value.split('-');
    let cadena2 = this.myForm.get('fecha3').value.split('-');

    let cuantas = parseInt(cadena2[2]) - parseInt(cadena[2]);

    this.myForm.controls.total.setValue('' + cuantas * 500);

    this.myForm.controls.total.disable();



    this.activatedRoute.queryParams.subscribe((params) => {
      let arrroom = this.myForm.get('room').value.split(' ');
      this.guestService.getRoomById(arrroom[0]).subscribe(item => {
        //console.log(item);
        this.currRoom = item as Room;


      });
    });

  }


  public newGuest(): void {
    if (!this.myForm.controls.advance.valid) {
      this.alerta7();
      return;
    }
    if (
      parseInt(this.myForm.get('advance').value) >
      parseInt(this.myForm.get('total').value)
    ) {
      this.alerta8();
      return;
    }

    this.name = this.myForm.get('name').value;
    this.phone = this.myForm.get('phone').value;
    this.f_arrival2 = this.myForm.get('fecha2').value;
    this.f_leave2 = this.myForm.get('fecha3').value;
    let arrroom = this.myForm.get('room').value.split(' ');
    this.rooom2 = arrroom[1];
    this.advance = parseInt(this.myForm.get('advance').value);
    this.token = this.myForm
      .get('phone')
      .value.replace(' ', '')
      .substring(
        this.myForm.get('phone').value.length - 4,
        this.myForm.get('phone').value.length
      );
    this.codacceso = this.randomIntFromInterval(1000, 9999);

    //////////////////////
    let cadena = this.myForm.get('fecha2').value.split('-');
    let cadena2 = this.myForm.get('fecha3').value.split('-');

    let cuantas = parseInt(cadena2[2]) - parseInt(cadena[2]);


    console.log("La fecha 1 es: " + this.myForm.get('fecha2').value)
    console.log("La fecha 2 es: " + this.myForm.get('fecha3').value)




    let auxfecha1 = this.myForm.get('fecha2').value.split('-');
    let auxfecha2 = this.myForm.get('fecha3').value.split('-');
    //0: YEAR; 
    //1: MONTH; 
    //2: DAY;

    let dayfecha1 = parseInt(auxfecha1[2]);

    let dayfecha2 = parseInt(auxfecha2[2]);

    let arrfechas: string[] = [];
    let actual: string;

    for (let i = 0; i < dayfecha2 - dayfecha1; i++) {

      console.log(auxfecha1[0] + "-" + auxfecha1[1] + "-" + (dayfecha1 + i))

      actual = auxfecha1[0] + "-" + auxfecha1[1] + "-" + (dayfecha1 + i);

      arrfechas.push(actual)
    }

    this.guestService.bloquearFechas(arrfechas, arrroom[0]);


    /////////////////////////////////////////

    this.guest = {
      token: this.token,
      name: this.name,
      telephone: this.phone,
      f_arrival2: this.f_arrival2,
      f_leave2: this.f_leave2,
      room: this.rooom2,
      accesscode: this.codacceso,
      n_days: cuantas,
      advance: this.advance,
      room_price: 500 * cuantas - this.advance,
    };

    this.guestService.newGuest(this.guest);

    //PARA GUARDAR LAS FECHAS NO DISPONIBLES

    let variable = parseInt(cadena[2]);

    //this.guestService.getPosition(this.myForm.get('room').value);


    for (let i = 0; i < cuantas; i++) {
      let variable = parseInt(cadena[2]) + i;
      let dia: string;
      dia = '' + variable;
      let fec = {
        years: cadena[0].toString(),
        months: cadena[1].toString(),
        date: dia.toString(),
      };

      //this.guestService.rooms[this.guestService.position].f_noDisp.push(fec);
      //this.guestService.blockedDates(this.guestService.getPosition(this.myForm.get('room').value), fec);
      //this.guestService.blockedDates(this.IdRoom);

      this.guestService.actualizarfecha = 1;
      //this.guestService.cuantas = (dayfecha2 - dayfecha1)
    }

    //////////////////////////////////////////




    this.myForm.controls.name.setValue('');
    this.myForm.controls.phone.setValue('');
    //this.myForm.controls.room.setValue('')
    this.myForm.controls.advance.setValue('');
    this.myForm.controls.total.setValue('');
    this.myForm.controls.fecha2.setValue(this.today);
    this.myForm.controls.fecha3.setValue(this.tomorrow);

    this.validado = false;
    this.fechaseleccionada1 = ''
    this.fechaseleccionada2 = ''

    this.myForm.controls.name.enable();
    this.myForm.controls.phone.enable();
    this.myForm.controls.room.enable();



  }

  public validaciones(): Boolean {
    if (!this.myForm.get('name').value) {
      this.presentAlert(this.inputname);
      return false;
    }
    if (!this.myForm.get('phone').value) {
      this.presentAlert(this.inputphone);
      return false;
    }
    if (!this.myForm.get('room').value) {
      this.alerta2();
      return false;
    }
    if (!this.validfecha1) {
      this.alerta5();
      return false;
    }
    if (!this.validfecha2) {
      this.alerta6();
      return false;
    }

    return true;
  }


  async presentAlert(input: IonInput) {
    let etiqueta = '';
    switch (input) {
      case this.inputname:
        etiqueta = ' Nombre';
        break;
      case this.inputphone:
        etiqueta = ' Telefono';
        break;
    }
    const alert = await this.alertController.create({
      header: 'Rellene:' + etiqueta,
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'OK',
          cssClass: 'alert-button-confirm',
        },
      ],
    });
    alert.onDidDismiss().then(() => {
      setTimeout(() => {
        input.setFocus();
      }, 100);
    });
    await alert.present();
  }

  public formatDate(date: Date) {
    return [
      date.getFullYear(),
      this.padTo2Digits(date.getMonth() + 1),
      this.padTo2Digits(date.getDate()),
    ].join('-');
  }

  public async alerta() {
    const alert = await this.alertController.create({
      header: 'Precaución',
      subHeader: 'La fecha de salida debe ser mayor que la de la llegada.',
      message: 'Esto es una advertencia',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => { },
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => { },
        },
      ],
    });
    await alert.present();
  }

  public async alerta2() {
    const alert = await this.alertController.create({
      subHeader: 'Seleccione una habitación',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => { },
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => { },
        },
      ],
    });
    await alert.present();
  }

  public async alerta5() {
    const alert = await this.alertController.create({
      subHeader: 'Seleccione otra fecha de llegada.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => { },
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => { },
        },
      ],
    });
    await alert.present();
  }

  public async alerta6() {
    const alert = await this.alertController.create({
      subHeader: 'Seleccione otra fecha de salida.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => { },
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => { },
        },
      ],
    });
    await alert.present();
  }

  public async alerta7() {
    const alert = await this.alertController.create({
      subHeader: 'Anticipo no valido.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => { },
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => { },
        },
      ],
    });
    await alert.present();
  }

  public async alerta8() {
    const alert = await this.alertController.create({
      subHeader: 'El anticipo no puede ser mayor que el total.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => { },
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => { },
        },
      ],
    });
    await alert.present();
  }

  public async alerta9() {
    const alert = await this.alertController.create({
      subHeader: 'Hay fechas no disponibles entre la llegada y la salida.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => { },
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => { },
        },
      ],
    });
    await alert.present();
  }

  public async alerta3() {
    const alert = await this.alertController.create({
      subHeader: 'Fecha de llegada seleccionada no disponible, elija otra',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => { },
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => { },
        },
      ],
    });
    await alert.present();
  }

  public async alerta4() {
    const alert = await this.alertController.create({
      subHeader: 'Fecha de salida seleccionada no disponible, elija otra',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => { },
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => { },
        },
      ],
    });
    await alert.present();
  }

  public async alerta10() {
    const alert = await this.alertController.create({
      subHeader: 'Hay fechas no disponibles entre la entrada y la llegada',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => { },
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => { },
        },
      ],
    });
    await alert.present();
  }

  public formatDate2(date: Date) {
    return [
      date.getFullYear(),
      this.padTo2Digits(date.getMonth() + 1),
      this.padTo2Digits(date.getDate() + 1),
    ].join('-');
  }

  public validarfechas(): boolean {
    // if(this.myForm.get('fecha2').value)
    // return false;
    let cadena = this.myForm.get('fecha2').value.split('-');
    let cadena2 = this.myForm.get('fecha3').value.split('-');

    if (parseInt(cadena[0]) > parseInt(cadena2[0])) {
      return true;
    } else if (parseInt(cadena[1]) > parseInt(cadena2[1])) {
      return true;
    } else if (parseInt(cadena[2]) >= parseInt(cadena2[2])) {
      return true;
    }
    return false;
  }

  public cancelar() {
    this.myForm.controls.name.setValue('');
    this.myForm.controls.phone.setValue('');
    //this.myForm.controls.room.setValue('')
    this.myForm.controls.advance.setValue('');
    this.myForm.controls.total.setValue('');
    this.myForm.controls.fecha2.setValue(this.today);
    this.myForm.controls.fecha3.setValue(this.tomorrow);

    this.validado = false;
    this.fechaseleccionada1 = ''
    this.fechaseleccionada2 = ''

    this.myForm.controls.name.enable();
    this.myForm.controls.phone.enable();
    this.myForm.controls.room.enable();

    this.router.navigate(['/reservations']);

    this.myForm.controls.room.setValue('')
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      phone: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(11),
          Validators.pattern(
            '^[+][(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$'
          ),
        ]),
      ],
      room: ['', Validators.compose([Validators.required])],
      fecha2: ['', Validators.compose([Validators.required])],
      fecha3: ['', Validators.compose([Validators.required])],
      total: [''],
      advance: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[0-9]+([.][0-9]+)?'),
        ]),
      ],
      imagen: ['']
    });

    this.validationMessages = {
      name: [{ type: 'required', message: 'El nombre es obligatorio.' }],
      phone: [
        { type: 'required', message: 'El teléfono es obligatorio.' },
        { type: 'minlength', message: 'El teléfono ser de 11 o más dígitos.' },
        { type: 'pattern', message: 'EL teléfono está mal formado' },
      ],
      room: [{ type: 'required', message: 'La habitación es obligatoria.' }],
      advance: [
        { type: 'required', message: 'El anticipo es obligatorio.' },
        { type: 'pattern', message: 'Cantidad no valida' },
      ],
    };

    this.myForm.controls.fecha2.setValue(this.today);
    this.myForm.controls.fecha3.setValue(this.tomorrow);
  }

  //CARGAR IMAGEN

  barStatus = false;
  imageUploads = [];

  uploadPhoto(event) {
    this.barStatus = true;
    this.guestService.storeImage(event.target.files[0]).then(
      (res: any) => {
        if (res) {
          console.log(res);
          this.imageUploads.unshift(res);
          this.barStatus = false;
        }
      },
      (error: any) => {
        //this.errorMessage = 'File size exceeded. Maximum file size 1 MB'
        this.barStatus = false;
      }
    );
  }
}
