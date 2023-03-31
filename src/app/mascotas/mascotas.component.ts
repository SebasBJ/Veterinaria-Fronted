import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Mascotas } from '../interface/mascotas';
import { EspecieMascota } from '../interface/especie-mascota';
import { EspecieMascotaService } from '../service/especie-mascota.service';
import { MascotasService } from '../service/mascotas.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.scss']
})

export class MascotasComponent implements OnInit {
  datosEspecie: Array<EspecieMascota> = [];
  myForm!: FormGroup;
  fecha = new FormControl(new Date());

  displayColumn: string[] = ['nmid', 'dsnombre_mascota', 'dsespecie', 'dsraza', 'dtfecha_nacimiento', 'dsnombre_completo', 'acciones'];
  dataSource: MatTableDataSource<Mascotas>;
  @Input() dsnombre_completo: string = '';
  @Input() nmid_propietarios: any;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private http: HttpClient,
    private config: NgbModalConfig, private modalService: NgbModal,
    public serviceMascotas: MascotasService, private serviceEspecie: EspecieMascotaService) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.dataSource = new MatTableDataSource(new Array<Mascotas>());
  }

  ngOnInit(): void {
    this.formulario();
    this.refresh();
    this.mostrarEspecie();
    this.route.queryParams.subscribe(params => {
      this.nmid_propietarios = params['nmid'],
        this.dsnombre_completo = params['dsnombre_completo'],
        this.myForm.get('nmid_propietarios')?.setValue(params['nmid'])
    });
  }

  guardar(form: FormGroup) {
    if (this.myForm.valid) {
      if (form.value.nmid && form.value.nmid !== 0) {
        this.actualizar(form);
        this.formulario();
        return;
      }
      this.serviceMascotas.createMascotas(form.value)
        .subscribe(data => {
          alert("Se guardo con exito la mascota!!");
          this.formulario();
          this.refresh();
        }
        )
    } else {
      alert('formualario inválido')
    }
  }

  actualizar(form: FormGroup) {
    this.serviceMascotas.updateMascotas(form.value)
      .subscribe(data => {
        alert("Se actualizó con exito!!")
        this.refresh();
      });
  }

  refresh() {
    this.route.queryParams.subscribe(params => {
      this.nmid_propietarios = params['nmid'];
      this.serviceMascotas.getPropietariosMascotas(this.nmid_propietarios).subscribe((rta: any) => {
        this.dataSource = new MatTableDataSource(rta.data);
        this.dataSource.sort = this.sort;
      });
    });
  }

  mostrarEspecie() {
    this.route.queryParams.subscribe(params => {
      this.serviceEspecie.getEspecieMascota().subscribe(datos => {
        this.datosEspecie = datos.data;
      });
    });
  }

  formulario() {
    this.myForm = this.fb.group({
      nmid: [''],
      dsnombre_mascota: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      nmid_especie: [''],
      dsraza: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      dtfecha_nacimiento: [''],
      nmid_propietarios: ['']
    });
  }

  editar(datos: {
    nmid: any; dsnombre_mascota: any; nmid_especie: any; dsraza: any; dtfecha_nacimiento: any;
    nmid_propietarios: any;
  }) {
    this.myForm.setValue({
      nmid: datos.nmid,
      dsnombre_mascota: datos.dsnombre_mascota,
      nmid_especie: datos.nmid_especie,
      dsraza: datos.dsraza,
      dtfecha_nacimiento: datos.dtfecha_nacimiento,
      nmid_propietarios: datos.nmid_propietarios
    })
  }

  errorbutton() {
    if (this.myForm.invalid) {
      alert("Debes llenar todos los campos!")
      return;
    }
  }

  open(content: any) {
    this.modalService.open(content);
  }

  openEdit(content: any) {
    this.modalService.open(content);
  }

  onEdit() {
    this.router.navigate(['/mascotas']);
  }
}
