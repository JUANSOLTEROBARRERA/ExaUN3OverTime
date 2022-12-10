import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FotoService {
  constructor() {}

  async tomarFoto() {
    // Take a photo
    return await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
  }
}

export interface Fotografia {
  ok: boolean;
  path: string;
  miniatura?: string;
  err?: object;
}
