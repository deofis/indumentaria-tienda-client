import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaPromoSubComponent } from './tabla-promo-sub.component';

describe('TablaPromoSubComponent', () => {
  let component: TablaPromoSubComponent;
  let fixture: ComponentFixture<TablaPromoSubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaPromoSubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaPromoSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
