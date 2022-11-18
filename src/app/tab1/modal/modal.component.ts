import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  public cerrar(seleccion: number) {
    this.modalController.dismiss({ seleccion});
  }
}
