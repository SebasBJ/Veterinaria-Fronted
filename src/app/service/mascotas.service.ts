import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Mascotas } from '../interface/mascotas';
import { Propietarios } from '../interface/propietarios';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {

  servidor = 'http://localhost:8080/api';
  constructor(private servicio: HttpClient) { }
  propietarios: Propietarios[] = [];

  getMascotas(): Observable<any> {
    return this.servicio.get(`${this.servidor}/mascotas`);
  }

  createMascotas(mascotas: Mascotas) {
    return this.servicio.post<Mascotas>(`${this.servidor}/mascotas`, mascotas);
  }

  updateMascotas(mascotas: Mascotas) {
    return this.servicio.put<Mascotas>(`${this.servidor}/mascotas`, mascotas);
  }

  getPropietariosMascotas(nmid_propietarios: number): Observable<any> {
    return this.servicio.get(`${this.servidor}/mascotaspropietarios/${nmid_propietarios}`);
  }
}
