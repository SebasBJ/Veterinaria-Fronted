import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Propietarios } from '../interface/propietarios';
import { PropietariosService } from '../service/propietarios.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-propietarios',
  templateUrl: './propietarios.component.html',
  styleUrls: ['./propietarios.component.scss']
})

export class PropietariosComponent {
  datosPropietarios: Array<Propietarios> = [];
  myForm!: FormGroup;
  today = new Date().toISOString().split('T')[0];
  disableSelect = new FormControl(false);
  displayColumn: string[] = ['nmid', 'dsnombre_completo', 'dstipo_documento', 'nmidentificacion', 'dsciudad', 'dsdireccion', 'nmtelefono', 'dtfecha_registro', 'acciones'];
  dataSource: MatTableDataSource<Propietarios>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, private config: NgbModalConfig, private modalService: NgbModal, private servicioPropietario: PropietariosService) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.dataSource = new MatTableDataSource(new Array<Propietarios>());
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
    this.servicioPropietario.getPropietario().subscribe((rta: any) => {
      this.dataSource = new MatTableDataSource(rta.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  formulario() {
    this.myForm = this.fb.group({
      nmid: [''],
      dsnombre_completo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      dstipo_documento: [''],
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
    this.modalService.open(content);
  }

  openEdit(content: any) {
    this.modalService.open(content);
  }

  onEdit() {
    this.router.navigate(['/propietarios']);
  }

  mostrar(datos: { nmid: number; dsnombre_completo: string; }) {
    this.router.navigate(["/mascotas"], { queryParams: { nmid: datos.nmid, dsnombre_completo: datos.dsnombre_completo } });
  }

  validar() {
    if (this.myForm.valid)
      this.myForm.markAllAsTouched();
    for (const key in this.myForm.controls) {
      this.myForm.controls[key].markAsDirty
    }
    let formularioPropietarios: any = document.getElementById("dsnombre_completo");
    let formualarioValid: boolean = formularioPropietarios.reportValidity();
  }
}
