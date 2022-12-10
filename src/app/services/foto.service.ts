import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';

import { HttpClient } from '@angular/common/http';
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

  //subirImgMiniatura(datos: FormData): Observable<Fotografia> {
  //  return this.httpClient.post<Fotografia>(`${environment.api}/img/miniatura`, datos);
  //}

  //subirImg(datos: FormData): Observable<Fotografia> {
  //  return this.httpClient.post<Fotografia>(`${environment.api}/img`, datos);
  //}

}

export interface Fotografia{
  ok: boolean;
  path: string;
  miniatura?: string;
  err?: object;
}