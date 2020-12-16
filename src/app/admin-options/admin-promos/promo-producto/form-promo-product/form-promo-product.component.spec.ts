import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPromoProductComponent } from './form-promo-product.component';

describe('FormPromoProductComponent', () => {
  let component: FormPromoProductComponent;
  let fixture: ComponentFixture<FormPromoProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPromoProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPromoProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
