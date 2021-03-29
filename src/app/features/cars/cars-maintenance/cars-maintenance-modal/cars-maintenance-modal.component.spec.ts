import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsMaintenanceModalComponent } from './cars-maintenance-modal.component';

describe('CarsMaintenanceModalComponent', () => {
  let component: CarsMaintenanceModalComponent;
  let fixture: ComponentFixture<CarsMaintenanceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsMaintenanceModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsMaintenanceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
