import { Component, OnInit } from '@angular/core';
import { GuestService } from '../services/guest.service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  public currentLanguage:number;
  public tittle:string[];
  public currenttittle:string;
  public text1:string[];
  public currenttext1:string;
  public text2:string[];
  public currenttext2:string;

  constructor(private gestService: GuestService) { }

  public changeLanguage(ln:number){
    this.currenttittle = this.tittle[ln];
    this.currenttext1 = this.text1[ln];
    this.currenttext2 = this.text2[ln];
  }

  ngOnInit() {
  }

}
