import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
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

  it('should call getEspecieMascota', () => {
    const methodSpy = spyOn(service.servicio,'get').and.returnValue(of({}));
    service.getEspecieMascota();
    expect(methodSpy).toHaveBeenCalledWith(`${service.servidor}/especie`);
  });
});
