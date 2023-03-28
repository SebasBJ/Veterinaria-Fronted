import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Mascotas } from '../interface/mascotas';
import { MascotasService } from '../service/mascotas.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent {
  datosMascotas: Array<Mascotas> = [];
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private config: NgbModalConfig, private modalService: NgbModal, private serviceMascotas: MascotasService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    let arrayMascotas: Array<Mascotas> = [];
    this.route.queryParams.subscribe(params => {
      this.serviceMascotas.getMascotas().subscribe(datos => {
        this.datosMascotas = datos.data;
      });
    });
  }
}
