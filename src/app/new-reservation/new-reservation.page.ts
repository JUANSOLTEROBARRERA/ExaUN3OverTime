import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Guest } from '../models/guest';
import { Router } from '@angular/router';
import { GuestService } from '../services/guest.service';
import { Room } from '../models/room';
import {AlertController} from '@ionic/angular';


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
  public rol: boolean;
  public myDate;
  
  //Datos para mandar nuevo guest
  public name: string;
  public phone: string;
  public f_arrival2: string;
  public f_leave2: string;
  public rooom2: string;
  public token: string;
  constructor(private guestService: GuestService, private fb: FormBuilder, private router: Router, private alertController: AlertController) {

    

    let str1 = this.guestService.currentUser();
    let str2 = "admin"
    if (str1 !== str2) {
      this.router.navigate(['/login']);
    } else {

    }

    this.today = this.formatDate(new Date());
    this.tomorrow = this.formatDate2(new Date());
    this.rooms = this.guestService.getRooms();
    console.log(this.rooms)
    console.log(this.today)


  }

  

  showdate(){
    console.log(this.myForm.get('fecha2').value);
    console.log(this.myForm.get('fecha3').value);
  }

  public padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  public newGuest():void{
    if(this.validarfechas() === false){
          this.name = this.myForm.get('name').value;
          this.phone = this.myForm.get('phone').value;
          this.f_arrival2 = this.myForm.get('fecha2').value;
          this.f_leave2 = this.myForm.get('fecha3').value;
          this.rooom2 = this.myForm.get('room').value
          this.token = this.myForm.get('phone').value.replace(" ", "").substring(this.myForm.get('phone').value.length-4, this.myForm.get('phone').value.length);
          this.guest = {
            token: this.token,
            name: this.name, 
            telephone: this.phone,
            f_arrival2: this.f_arrival2,
            f_leave2: this.f_leave2, 
            room: this.rooom2
          }

          this.guestService.newGuest(this.guest);
          this.myForm.setValue({name: '', phone: '', fecha2: this.today, fecha3: this.tomorrow, room: ''});
    }else{
        console.log("pos no carnal");
        this.alerta();
        this.myForm.controls.fecha2.setValue(this.today);
        this.myForm.controls.fecha3.setValue(this.tomorrow);
    }

  }

  public formatDate(date: Date) {
    return (
      [
        date.getFullYear(),
        this.padTo2Digits(date.getMonth() + 1),
        this.padTo2Digits(date.getDate()),
      ].join('-')
    );
  }

  public async alerta() {
    const alert = await this.alertController.create({
      header: 'Precaución',
      subHeader: 'no puede ser mayor la fecha de ingreso que la de salida',
      message: 'Esto es una advertencia',
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
            
          }
        }
      ]
    });
    await alert.present();
  }


  public formatDate2(date: Date) {
    return (
      [
        date.getFullYear(),
        this.padTo2Digits(date.getMonth() + 1),
        this.padTo2Digits(date.getDate() + 1),
      ].join('-')
    );
  }

  public validarfechas():boolean{
   // if(this.myForm.get('fecha2').value)
   // return false;
    let cadena = this.myForm.get('fecha2').value.split("-");
    console.log(parseInt(cadena[0]), parseInt(cadena[1]), parseInt(cadena[2]));
    let cadena2 = this.myForm.get('fecha3').value.split("-");
    console.log(parseInt(cadena2[0]), parseInt(cadena2[1]), parseInt(cadena2[2]));
    if(parseInt(cadena[0])>parseInt(cadena2[0])){
        return true;
    }else if(parseInt(cadena[1])>parseInt(cadena2[1])){
        return true;
    }else if(parseInt(cadena[2])>parseInt(cadena2[2])){
      return true;
    }
    return false;
  }

  ngOnInit() {
    this.myForm = this.fb.group(
      {
        name: ["", Validators.compose([Validators.required])],
        phone: ["", Validators.compose([Validators.required, Validators.minLength(11), Validators.pattern('^[\+][(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$')])],
        room: ["", Validators.compose([Validators.required])],
        fecha2: ["", Validators.compose([Validators.required])],
        fecha3: ["", Validators.compose([Validators.required])]
      }
    );

    this.validationMessages = {
      name: [
        { type: 'required', message: "El nombre es obligatorio." }
      ],
      phone: [
        { type: 'required', message: "El teléfono es obligatorio." },
        { type: 'minlength', message: "El teléfono ser de 11 o más dígitos." },
        { type: 'pattern', message: "EL teléfono está mal formado" }
      ],
      room: [
        { type: 'required', message: "La habitación es obligatoria." }
      ],
    }

    this.myForm.controls.fecha2.setValue(this.today);
    this.myForm.controls.fecha3.setValue(this.tomorrow);
  }

}
