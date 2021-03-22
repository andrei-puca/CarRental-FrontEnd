import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentallocationsComponent } from './rentallocations.component';

describe('RentallocationsComponent', () => {
  let component: RentallocationsComponent;
  let fixture: ComponentFixture<RentallocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentallocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentallocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
