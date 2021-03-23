import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsMaintenanceComponent } from './cars-maintenance.component';

describe('CarsMaintenanceComponent', () => {
  let component: CarsMaintenanceComponent;
  let fixture: ComponentFixture<CarsMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
