import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedMssgComponent } from './activated-mssg.component';

describe('ActivatedMssgComponent', () => {
  let component: ActivatedMssgComponent;
  let fixture: ComponentFixture<ActivatedMssgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivatedMssgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivatedMssgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
