import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MascotasService } from './mascotas.service';
import { Mascotas } from '../interface/mascotas';

describe('MascotasService', () => {
  let service: MascotasService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MascotasService]
    });
    service = TestBed.inject(MascotasService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a list of mascotas', () => {
    const mascotas: Mascotas[] = [
      {
        nmid: 1,
        dsnombre_mascota: '',
        dsraza: '',
        dtfecha_nacimiento: new Date('2020-05-12'),
        nmid_propietarios: 1,
        nmid_especie: 3,
        dsnombre_completo: '',
        dsespecie:''
      },
      {
        nmid: 2,
        dsnombre_mascota: '',
        dsraza: '',
        dtfecha_nacimiento: new Date('2020-05-12'),
        nmid_propietarios: 1,
        nmid_especie: 3,
        dsnombre_completo: '',
        dsespecie:''
      }
    ];

    service.getMascotas().subscribe(mascotas => {
      expect(mascotas.length).toBe(2);
      expect(mascotas).toEqual(mascotas);
    });

    const req = httpMock.expectOne(`${service.servidor}/mascotas`);
    expect(req.request.method).toBe('GET');
    req.flush(mascotas);
  });

  it('should create a new mascota', () => {
    const newMascota: Mascotas = {
      nmid: 3,
      dsnombre_mascota: '',
      dsraza: '',
      dtfecha_nacimiento: new Date('2020-05-12'),
      nmid_propietarios: 1,
      nmid_especie: 3,
      dsnombre_completo: '',
      dsespecie: ''
    };

    service.createMascotas(newMascota).subscribe(mascota => {
      expect(mascota.nmid).toBe(3);
      expect(mascota.dsnombre_mascota).toBe('');
      expect(mascota.dsraza).toBe('');
      expect(mascota.dtfecha_nacimiento).toBe(new Date('2020-05-12'));
      expect(mascota.nmid_propietarios).toBe(1);
      expect(mascota.nmid_especie).toBe(3);
    });

    const req = httpMock.expectOne(`${service.servidor}/mascotas`);
    expect(req.request.method).toBe('POST');
    req.flush(newMascota);
  });

  it('should update an existing mascota', () => {
    const updatedMascota: Mascotas = {
      nmid: 1,
      dsnombre_mascota: '',
      dsraza: '',
      dtfecha_nacimiento: new Date('2020-05-12'),
      nmid_propietarios: 1,
      nmid_especie: 3,
      dsnombre_completo: '',
      dsespecie: ''
    };

    service.updateMascotas(updatedMascota).subscribe(mascota => {
      expect(mascota.nmid).toBe(1);
      expect(mascota.dsnombre_mascota).toBe('');
      expect(mascota.dsraza).toBe('');
      expect(mascota.dtfecha_nacimiento).toBe(new Date('2020-05-12'));
      expect(mascota.nmid_propietarios).toBe(1);
      expect(mascota.nmid_especie).toBe(3);
    });

    const req = httpMock.expectOne(`${service.servidor}/mascotas`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedMascota);
  });

  it('should get a list of propietarios of a mascota', () => {
    const mockMascotas = [{
      nmid: 1,
      dsnombre_mascota: '',
      dsraza: '',
      dtfecha_nacimiento: new Date('2020-05-12'),
      nmid_propietarios: 1,
      nmid_especie: 3,
    },
    {
      nmid: 1,
      dsnombre_completo: '',
    }];

    service.getMascotas().subscribe(mascotas => {
      expect(mascotas.length).toBe(2);
      expect(mascotas).toEqual(mockMascotas);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/propietarios');
    expect(req.request.method).toBe('GET');
    req.flush(mockMascotas);
  });
});
