import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmPaypalEnvioComponent } from './fm-paypal-envio.component';

describe('FinalMessageComponent', () => {
  let component: FmPaypalEnvioComponent;
  let fixture: ComponentFixture<FmPaypalEnvioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FmPaypalEnvioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FmPaypalEnvioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
