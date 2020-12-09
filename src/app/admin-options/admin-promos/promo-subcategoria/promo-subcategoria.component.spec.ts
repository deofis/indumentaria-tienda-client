import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoSubcategoriaComponent } from './promo-subcategoria.component';

describe('PromoSubcategoriaComponent', () => {
  let component: PromoSubcategoriaComponent;
  let fixture: ComponentFixture<PromoSubcategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoSubcategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoSubcategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
