import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Mascotas } from '../interface/mascotas';
import { MascotasService } from '../service/mascotas.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent {
  displayColumn: string[] = ['nmid', 'dsnombre_mascota', 'dsespecie', 'dsraza', 'dtfecha_nacimiento', 'dsnombre_completo'];
  dataSource: MatTableDataSource<Mascotas>;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private route: ActivatedRoute, private router: Router,
    private http: HttpClient, private config: NgbModalConfig, private modalService: NgbModal,
    private serviceMascotas: MascotasService) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.dataSource = new MatTableDataSource(new Array<Mascotas>());
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.serviceMascotas.getMascotas().subscribe((rta:any) => {
        this.dataSource = new MatTableDataSource(rta.data);
        this.dataSource.sort = this.sort;
      });
    });
  }
}
