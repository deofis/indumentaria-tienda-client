import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoProductoComponent } from './promo-producto.component';

describe('PromoProductoComponent', () => {
  let component: PromoProductoComponent;
  let fixture: ComponentFixture<PromoProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
