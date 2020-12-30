import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperCartComponent } from './stepper-cart.component';

describe('StepperCartComponent', () => {
  let component: StepperCartComponent;
  let fixture: ComponentFixture<StepperCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepperCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
