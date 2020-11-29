import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPromosComponent } from './admin-promos.component';

describe('AdminPromosComponent', () => {
  let component: AdminPromosComponent;
  let fixture: ComponentFixture<AdminPromosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPromosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPromosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
