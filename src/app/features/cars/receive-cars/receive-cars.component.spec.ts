import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveCarsComponent } from './receive-cars.component';

describe('ReceiveCarsComponent', () => {
  let component: ReceiveCarsComponent;
  let fixture: ComponentFixture<ReceiveCarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiveCarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiveCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
