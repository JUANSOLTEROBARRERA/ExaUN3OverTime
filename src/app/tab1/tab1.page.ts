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
  public text1:string[];
  public currenttext1:string;
  public text2:string[];
  public currenttext2:string;

  constructor(private guestService:GuestService) {
    this.currentLanguage = this.guestService.getLanguage();
    this.tittle=['Acerca del Hotel','About the Hotel',"à propos de l'hôtel"];
    this.text1=['En diciembre de 2017, Hotel Xcaret México abrió sus puertas para ofrecer lo mejor de México incluido. Nació como un homenaje a la cultura maya y a nuestro país, a sus artesanos, su gastronomía, su riqueza viva y su patrimonio cultural. La hospitalidad que nos caracteriza y la excelencia en nuestro servicio, nos ha dado numerosos reconocimientos, entre ellos la certificación 5 Diamantes. Cada logro es un compromiso con México y contigo. Te invitamos a conocer México a través de nuestro amor por él.','In December 2017, Hotel Xcaret México opened its doors to offer the best of Mexico included. It was born as a tribute to the Mayan culture and to our country, to its artisans, its gastronomy, its living wealth and its cultural heritage. The hospitality that characterizes us and the excellence in our service has given us numerous recognitions, including the 5 Diamond certification. Each achievement is a commitment to Mexico and to you. We invite you to discover Mexico through our love for it.',"En décembre 2017, l'hôtel Xcaret México a ouvert ses portes pour offrir le meilleur du Mexique inclus. Il est né comme un hommage à la culture maya et à notre pays, à ses artisans, sa gastronomie, sa richesse vivante et son patrimoine culturel. L'hospitalité qui nous caractérise et l'excellence de notre service nous ont valu de nombreuses reconnaissances, dont la certification 5 Diamants. Chaque réalisation est un engagement envers le Mexique et envers vous. Nous vous invitons à découvrir le Mexique à travers notre amour pour lui."]
    this.text2=['Despierta con una fascinante vista al mar Caribe, a nuestras icónicas caletas, río color esmeralda o áreas protegidas de la selva maya. De aquí en adelante, deja que el servicio personalizado, la artesanía hecha a mano y el diseño interior sean el escenario perfecto para un descanso inigualable. Todos los elementos decorativos de nuestras 900 suites son creados por talento local de comunidades vulnerables, adquiridos con una visión de comercio justo y compromiso con el desarrollo social de nuestro país.','Wake up with a fascinating view of the Caribbean Sea, our iconic coves, emerald river or protected areas of the Mayan jungle. From here on out, let the personalized service, handmade craftsmanship, and interior design be the perfect setting for unbeatable rest. All the decorative elements of our 900 suites are created by local talent from vulnerable communities, acquired with a vision of fair trade and commitment to the social development of our country.',"Réveillez-vous avec une vue fascinante sur la mer des Caraïbes, nos criques emblématiques, la rivière émeraude ou les zones protégées de la jungle maya. À partir de maintenant, laissez le service personnalisé, l'artisanat fait à la main et la décoration intérieure être le cadre idéal pour un repos imbattable. Tous les éléments décoratifs de nos 900 suites sont créés par des talents locaux issus de communautés vulnérables, acquis avec une vision de commerce équitable et d'engagement pour le développement social de notre pays."]
    this.changeLanguage(1);
  }
  public changeLanguage(ln:number){
    this.guestService.selectLanguage(ln);
    this.currenttittle = this.tittle[ln];
    this.currenttext1 = this.text1[ln];
    this.currenttext2 = this.text2[ln];
  }

}
