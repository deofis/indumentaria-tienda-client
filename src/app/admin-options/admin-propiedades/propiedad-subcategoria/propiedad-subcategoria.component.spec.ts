import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropiedadSubcategoriaComponent } from './propiedad-subcategoria.component';

describe('PropiedadSubcategoriaComponent', () => {
  let component: PropiedadSubcategoriaComponent;
  let fixture: ComponentFixture<PropiedadSubcategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropiedadSubcategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropiedadSubcategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
