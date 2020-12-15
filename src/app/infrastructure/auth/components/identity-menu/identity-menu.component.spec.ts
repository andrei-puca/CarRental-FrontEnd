import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { IdentityMenuComponent } from "./identity-menu.component";

describe("IdentityMenuComponent", () => {
  let component: IdentityMenuComponent;
  let fixture: ComponentFixture<IdentityMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IdentityMenuComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentityMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
