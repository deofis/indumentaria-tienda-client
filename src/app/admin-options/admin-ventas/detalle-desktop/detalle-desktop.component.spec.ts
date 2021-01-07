import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleDesktopComponent } from './detalle-desktop.component';

describe('DetalleDesktopComponent', () => {
  let component: DetalleDesktopComponent;
  let fixture: ComponentFixture<DetalleDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleDesktopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
