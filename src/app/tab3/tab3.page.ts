import { Component, OnInit } from '@angular/core';

import { GuestService } from '../services/guest.service';
import { ModalComponent } from './../tab1/modal/modal.component';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  public name: string;
  public currentLanguage: number;
  public titles: [string[], string[], string[]] = [
    ['Actividades', 'Recomendaciones', 'Historia', 'Números de emergencia'],
    ['Activities', 'Recommendations', 'History', 'Emergency numbers'],
    ['Activités', 'Recommandations', 'Histoire', `Numéros d'urgence`],
  ];
  public currenttittle: string;
  public text1: string[];
  public currenttext1: string;
  public text2: string[];
  public currenttext2: string;
  public actividades: [string[], string[], string[]] = [
    [
      '1. Ríos subterráneos y Mar Caribe',
      '2. Danzas típicas mexicanas',
      '3. Zonas arqueológicas mayas',
      '4. Xcaret México Espectacular',
    ],
    [
      '1. Subterranean rivers and the Caribbean Sea',
      '2. Typical Mexican dances',
      '3. mayan archaeological sites',
      '4. Xcaret Mexico Spectacular',
    ],
    [
      '1. Les rivières souterraines et la mer des Caraïbes',
      '2. Danses typiques du Mexique',
      '3. sites archéologiques mayas',
      '4. Xcaret Mexico Spectaculaire',
    ],
  ];

  public recomendaciones: [string[], string[], string[]] = [
    [
      `Usa ropa cómoda de playa y traje de baño. Trae toalla y una muda
    extra.`,
      `Tus bloqueadores y bronceadores solo deben contener óxido de
    titanio y óxido de zinc para su uso en el parque.`,
      `Lleva efectivo o tarjeta para comprar souvenirs, realizar alguna
    Actividad Opcional o adquirir las fotos de tu visita.`,
    ],
    [
      `Wear comfortable beach clothes and a bathing suit. Bring a towel and an extra`,
      `Your sunscreens and suntan lotions should only contain titanium oxide and zinc oxide for use in the park. and zinc oxide for use in the park.`,
      `Bring cash or credit card to buy souvenirs, do an optional activity or buy photos of your visit. optional activity or purchase photos of your visit.`,
    ],
    [
      `Portez des vêtements de plage confortables et un maillot de bain. Apportez une serviette et un`,
      `Vos écrans solaires et lotions bronzantes ne doivent contenir que de l'oxyde de titane et de l'oxyde de zinc pour une utilisation dans le parc. et de l'oxyde de zinc pour une utilisation dans le parc.`,
      `Apportez de l'argent liquide ou une carte de crédit pour acheter des souvenirs, faire une activité facultative ou acheter des photos de votre visite. activité facultative ou acheter des photos de votre visite.`,
    ],
  ];

  public historia: [string[], string[], string[]] = [
    [
      `En 1984, el arquitecto Miguel Quintana Pali adquirió cinco hectáreas
    en la Riviera Maya para construir su residencia. Sin embargo, al
    empezar a limpiar el terreno, descubrió que tenía cenotes y ríos
    subterráneos. Decidió entonces crear un parque para que todos tuvieran
    acceso a las bellezas naturales de la región.`,
      `Junto con los hermanos Oscar, Marcos y Carlos Constandse,
    Quintana Pali logró concretar la idea de este parque al que llamó
    Xcaret. Desde su apertura en diciembre de 1990, ha sido reconocido
    como una de las atracciones más famosas del destino turístico
    Cancún-Riviera Maya.`,
    ],
    [
      `In 1984, architect Miguel Quintana Pali acquired five hectares of land in the Riviera Maya to build his
    in the Riviera Maya to build his residence. However, as he began to
    However, when he began to clear the land, he discovered that it had cenotes and underground rivers.
    subway rivers. He decided to create a park so that everyone would have access to the natural beauties of the Riviera Maya.
    access to the natural beauties of the region.`,
      `Together with brothers Oscar, Marcos and Carlos Constandse,
    Quintana Pali managed to materialize the idea of this park, which he called Xcaret.
    Xcaret. Since its opening in December 1990, it has been recognized as one of the most famous attractions in the tourist destination.
    as one of the most famous attractions in the Cancun-Riviera Maya tourist destination.
    Cancun-Riviera Maya.`,
    ],
    [
      `En 1984, l'architecte Miguel Quintana Pali a acquis un terrain de cinq hectares dans la Riviera Maya pour construire son
    dans la Riviera Maya pour y construire sa résidence. Cependant, lorsqu'il a commencé à
    Cependant, lorsqu'il a commencé à défricher le terrain, il a découvert qu'il comportait des cenotes et des rivières souterraines.
    des rivières souterraines. Il a décidé de créer un parc pour que tout le monde ait accès aux beautés naturelles de la Riviera Maya.
    accès aux beautés naturelles de la région.`,
      `Avec les frères Oscar, Marcos et Carlos Constandse,
    Quintana Pali a réussi à concrétiser l'idée de ce parc, qu'il a appelé Xcaret.
    Xcaret. Depuis son ouverture en décembre 1990, il a été reconnu comme l'une des attractions les plus célèbres de la destination touristique.
    comme l'une des attractions les plus célèbres de la destination touristique Cancun-Riviera Maya.
    Cancun-Riviera Maya.`,
    ],
  ];

  constructor(
    private gestService: GuestService,
    private modalController: ModalController,
    private router: Router
  ) {
    this.currentLanguage = this.gestService.getLanguage();
    this.name = localStorage.getItem('name');
    let auxi = this.name.split(' ');

    this.name = auxi[0];
  }

  public goPay() {
    this.router.navigate(['/tabs/tab2']);
  }

  public changeLanguage(ln: number) {
    this.currentLanguage = ln;
  }
  public goLogin() {
    this.router.navigate(['/login']);
  }

  ngOnInit() {}
}
