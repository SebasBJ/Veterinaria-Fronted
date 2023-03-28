import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Propietarios } from '../interface/propietarios';

@Injectable({
  providedIn: 'root'
})
export class PropietariosService {

  servidor = 'http://localhost:8080/api';
  constructor(public servicio: HttpClient) { }

  getPropietario(): Observable<any> {
    return this.servicio.get(`${this.servidor}/propietarios`);
  }

  createPropietario(propietarios: Propietarios) {
    return this.servicio.post<Propietarios>(`${this.servidor}/propietarios`, propietarios);
  }

  updatePropietario(propietarios: Propietarios) {
    return this.servicio.put<Propietarios>(`${this.servidor}/propietarios`, propietarios);
  }
}
