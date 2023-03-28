import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PropietariosService } from './propietarios.service';
import { Propietarios } from '../interface/propietarios';

describe('PropietariosService', () => {
  let service: PropietariosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PropietariosService]
    });
    service = TestBed.inject(PropietariosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return list of propietarios', () => {
    const mockPropietarios = [{
      nmid: 1,
      dsnombre_completo: '',
      dstipo_documento: '',
      nmidentificacion: 12345678,
      dsciudad: '',
      dsdireccion: '',
      nmtelefono: 1234567,
      dtfecha_registro: new Date('2000-08-12'),
    },
    {
      nmid: 2,
      dsnombre_completo: '',
      dstipo_documento: '',
      nmidentificacion: 876543219,
      dsciudad: '',
      dsdireccion: '',
      nmtelefono: 23456781,
      dtfecha_registro: new Date('2003-06-02'),
    }];

    service.getPropietario().subscribe(propietarios => {
      expect(propietarios.length).toBe(2);
      expect(propietarios).toEqual(mockPropietarios);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/propietarios');
    expect(req.request.method).toBe('GET');
    req.flush(mockPropietarios);
  });

  it('should create a propietario', () => {
    const propietarios: Propietarios = {
      nmid: 1,
      dsnombre_completo: '',
      dstipo_documento: '',
      nmidentificacion: 12345678,
      dsciudad: '',
      dsdireccion: '',
      nmtelefono: 1234567,
      dtfecha_registro: new Date('1990-01-01'),
    };

    service.createPropietario(propietarios).subscribe(prop => {
      expect(prop).toEqual(propietarios);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/propietarios');
    expect(req.request.method).toBe('POST');
    req.flush(propietarios);
  });

  it('should update a propietario', () => {
    const updatedPropietario = {
      nmid: 1,
      dsnombre_completo: '',
      dstipo_documento: '',
      nmidentificacion: 12345678,
      dsciudad: '',
      dsdireccion: '',
      nmtelefono: 1234567,
      dtfecha_registro: new Date('1990-01-01')
    };

    service.updatePropietario(updatedPropietario).subscribe(prop => {
      expect(prop).toEqual(updatedPropietario);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/propietarios');
    expect(req.request.method).toBe('PUT');
    req.flush(updatedPropietario);
  });
});
