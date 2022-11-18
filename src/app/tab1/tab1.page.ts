import { Component } from '@angular/core';
import { GuestService } from '../services/guest.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public currentLanguage:number;
  public tittle:string[];
  public currenttittle:string;

  constructor(private guestService:GuestService) {
    this.currentLanguage = this.guestService.getLanguage();
    this.tittle=['Acerca del Hotel','About the Hotel',"à propos de l'hôtel"];
    this.changeLanguage(1);
  }
  public changeLanguage(ln:number){
    this.currenttittle = this.tittle[ln];
  }

}
