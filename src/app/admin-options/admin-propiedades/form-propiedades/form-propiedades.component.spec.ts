import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPropiedadesComponent } from './form-propiedades.component';

describe('FormPropiedadesComponent', () => {
  let component: FormPropiedadesComponent;
  let fixture: ComponentFixture<FormPropiedadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPropiedadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPropiedadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
