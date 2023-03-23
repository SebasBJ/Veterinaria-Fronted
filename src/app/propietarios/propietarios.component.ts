import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { Propietarios } from '../interface/propietarios';
import { PropietariosService } from '../service/propietarios.service';

@Component({
  selector: 'app-propietarios',
  templateUrl: './propietarios.component.html',
  styleUrls: ['./propietarios.component.scss']
})

export class PropietariosComponent {
  data: any;
  datosPropietarios: Array<Propietarios> = [];
  myForm!: FormGroup;
  today = new Date().toISOString().split('T')[0];
  dtTrigger = new Subject<any>();

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private http: HttpClient, private config: NgbModalConfig, private modalService: NgbModal, private servicioPropietario: PropietariosService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.formulario();
    this.refresh();
  }

  guardar(form: FormGroup) {
    if (this.myForm.valid) {
      if (form.value.nmid && form.value.nmid !== 0) {
        this.actualizar(form);
        this.formulario();
        return;
      }
      this.servicioPropietario.createPropietario(form.value)
        .subscribe(data => {
          alert("Se guardo con exito el propietario!");
          this.formulario();
        }
        )
    } else {
      alert('formualario inválido')
    }
  }

  actualizar(form: FormGroup) {
    this.servicioPropietario.updatePropietario(form.value)
      .subscribe(data => {
        alert("Se actualizó con exito!!")
      });
  }

  refresh() {
    let arrayPropietarios: Array<Propietarios> = [];
    this.servicioPropietario.getPropietario().subscribe(datos => {
      this.datosPropietarios = datos.data;
    });
  }

  formulario() {
    this.myForm = this.fb.group({
      nmid: [''],
      dsnombre_completo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      dstipo_documento: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      nmidentificacion: [''],
      dsciudad: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      dsdireccion: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      nmtelefono: [''],
      dtfecha_registro: [this.today]
    });
  }

  editar(datos: {
    nmid: any; dsnombre_completo: any; dstipo_documento: any; nmidentificacion: any;
    dsciudad: any; dsdireccion: any; nmtelefono: any; dtfecha_registro: any;
  }) {
    this.myForm.setValue({
      nmid: datos.nmid,
      dsnombre_completo: datos.dsnombre_completo,
      dstipo_documento: datos.dstipo_documento,
      nmidentificacion: datos.nmidentificacion,
      dsciudad: datos.dsciudad,
      dsdireccion: datos.dsdireccion,
      nmtelefono: datos.nmtelefono,
      dtfecha_registro: datos.dtfecha_registro
    })
  }

  open(content: any) {
    this.modalService.open(content, { size: 'xl' });
  }

  openEdit(content: any) {
    this.modalService.open(content);
  }

  onEdit(){
    this.router.navigate(['/propietarios']);
  }
}
