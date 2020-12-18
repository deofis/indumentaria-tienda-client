import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPropiedadesComponent } from './admin-propiedades.component';

describe('AdminPropiedadesComponent', () => {
  let component: AdminPropiedadesComponent;
  let fixture: ComponentFixture<AdminPropiedadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPropiedadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPropiedadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
