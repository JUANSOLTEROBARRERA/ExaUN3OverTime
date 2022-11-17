import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GuestService } from '../services/guest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public myForm: FormGroup;
  public validationMessages: Object;

  constructor(private guestService: GuestService, private fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group(
      {
        token: ["", Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern('[A-Z][0-9][0-9][0-9][0-9]+')])],
      }
    );

    this.validationMessages = {
      token: [
        { type: 'required', message: "Token es obligatorio." },
        { type: 'minlength', message: "El Token debe ser de 5 o más dígitos." },
        { type: 'pattern', message: "EL Token está mal formado" }
      ]
    }
  }

}
