import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { EspecieMascota } from '../interface/especie-mascota';

import { EspecieMascotaService } from './especie-mascota.service';

describe('EspecieMascotaService', () => {
  let service: EspecieMascotaService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EspecieMascotaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a list of mascotas', () => {
    const especie: EspecieMascota[] = [
      {
        nmid: 1,
        dsespecie:''
      },
      {
        nmid: 2,
        dsespecie:''
      }
    ];

    service.getEspecieMascota().subscribe(especie => {
      expect(especie.length).toBe(2);
      expect(especie).toEqual(especie);
    });

    const req = httpMock.expectOne(`${service.servidor}/especie`);
    expect(req.request.method).toBe('GET');
    req.flush(especie);
  });
});
