import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertController } from '@ionic/angular';
import { Guest } from '../models/guest';
import { GuestService } from '../services/guest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public myForm: FormGroup;
  public validationMessages: Object;
  public guest: Guest;

  constructor(private guestService: GuestService, private fb: FormBuilder, private alertController: AlertController, private router: Router) { }

  ngOnInit() {
    this.myForm = this.fb.group(
      {
        token: ["", Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern('[0-9][0-9][0-9][0-9]+')])],
      }
    );

    this.validationMessages = {
      token: [
        { type: 'required', message: "Token es obligatorio." },
        { type: 'minlength', message: "El Token debe ser de 4 o más dígitos." },
        { type: 'pattern', message: "EL Token está mal formado" }
      ]
    }
  }

  public async alerta() {
    const alert = await this.alertController.create({
      header: 'Precaución',
      subHeader: 'No existe las credenciales',
      message: 'Esto es una advertencia',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => {

          }
        }
      ]
    });
    await alert.present();
  }

  ingresar() {

    if (this.myForm.controls.token.valid) {
      var f = this.myForm.get('token').value;
      if (this.guestService.searchToken(f, 'admin') === true) {
        console.log('ingresado');
        localStorage.setItem('name', 'Admin');
        this.guestService.logged("admin")
        this.router.navigate(['/reservations'])
        this.myForm.setValue({ token: '' });
      } else if (this.guestService.searchTokenExisting(f) === true) {
        
        this.router.navigate(['/tabs']);
        this.guestService.logged(this.myForm.get('token').value);
        this.myForm.setValue({ token: '' });
      } else {
        this.alerta();
      }
    }
  }
}
