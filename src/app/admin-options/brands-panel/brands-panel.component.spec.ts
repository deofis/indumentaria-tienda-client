import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsPanelComponent } from './brands-panel.component';

describe('BrandsPanelComponent', () => {
  let component: BrandsPanelComponent;
  let fixture: ComponentFixture<BrandsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandsPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
