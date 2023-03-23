import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPropietariosComponent } from './edit-propietarios.component';

describe('EditPropietariosComponent', () => {
  let component: EditPropietariosComponent;
  let fixture: ComponentFixture<EditPropietariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPropietariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPropietariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
