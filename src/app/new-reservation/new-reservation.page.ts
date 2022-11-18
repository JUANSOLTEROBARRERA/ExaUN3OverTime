import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Guest } from '../models/guest';
import { Router } from '@angular/router';
import { GuestService } from '../services/guest.service';

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

  constructor(private guestService: GuestService, private fb: FormBuilder, private router: Router) {
      this.today =this.formatDate(new Date());
      this.tomorrow =this.formatDate2(new Date());
   }

   public padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
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

  public formatDate2(date: Date) {
    return (
      [
        date.getFullYear(),
        this.padTo2Digits(date.getMonth() + 1),
        this.padTo2Digits(date.getDate()+1),
      ].join('-') 
    );
  }

  ngOnInit() {
    this.myForm = this.fb.group(
      {
        name: ["", Validators.compose([Validators.required])],
        phone: ["", Validators.compose([Validators.required, Validators.minLength(11), Validators.pattern('^[\+][(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$')])],
        room:["", Validators.compose([Validators.required])]
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
        { type: 'required', message: "La habitación es obligatoria."}
      ]
    }
  }

}
