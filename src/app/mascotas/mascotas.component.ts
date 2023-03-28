import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Mascotas } from '../interface/mascotas';
import { EspecieMascota } from '../interface/especie-mascota';
import { EspecieMascotaService } from '../service/especie-mascota.service';
import { MascotasService } from '../service/mascotas.service';

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.scss']
})

export class MascotasComponent implements OnInit {
  datosMascotas: Array<Mascotas> = [];
  datosEspecie: Array<EspecieMascota> = [];
  myForm!: FormGroup;
  today = new Date().toISOString().split('T')[0];
  fecha = new FormControl(new Date());
  @Input() dsnombre_completo: string = '';
  @Input() nmid_propietarios: any;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private http: HttpClient,
    private config: NgbModalConfig, private modalService: NgbModal,
    private serviceMascotas: MascotasService, private serviceEspecie: EspecieMascotaService) {
    config.backdrop = 'static';
    config.keyboard = false;
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
    let arrayMascotas: Array<Mascotas> = [];
    this.route.queryParams.subscribe(params => {
      this.nmid_propietarios = params['nmid'];
      this.serviceMascotas.getPropietariosMascotas(this.nmid_propietarios).subscribe(datos => {
        this.datosMascotas = datos.data;
      });
    });
  }

  mostrarEspecie() {
    let arrayEspecie: Array<EspecieMascota> = [];
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
      dsraza: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      dtfecha_nacimiento: [this.today],
      nmid_propietarios: [''],
      nmid_especie: [''],
    });
  }

  editar(datos: {
    nmid: any; dsnombre_mascota: any; dsraza: any; dtfecha_nacimiento: any;
    nmid_propietarios: any; nmid_especie: any;
  }) {
    this.myForm.setValue({
      nmid: datos.nmid,
      dsnombre_mascota: datos.dsnombre_mascota,
      dsraza: datos.dsraza,
      dtfecha_nacimiento: datos.dtfecha_nacimiento,
      nmid_propietarios: datos.nmid_propietarios,
      nmid_especie: datos.nmid_especie,
    })
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

  validar() {
    if (this.myForm.valid)
      this.myForm.markAllAsTouched();
    for (const key in this.myForm.controls) {
      this.myForm.controls[key].markAsDirty
    }
    let formularioMascotas: any = document.getElementById("dsnombre_mascota");
    let formualarioValid: boolean = formularioMascotas.reportValidity();
  }
}
