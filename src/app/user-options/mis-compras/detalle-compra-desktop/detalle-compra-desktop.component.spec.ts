import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCompraDesktopComponent } from './detalle-compra-desktop.component';

describe('DetalleCompraDesktopComponent', () => {
  let component: DetalleCompraDesktopComponent;
  let fixture: ComponentFixture<DetalleCompraDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleCompraDesktopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleCompraDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
