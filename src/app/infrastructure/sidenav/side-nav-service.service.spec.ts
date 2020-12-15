import { TestBed } from "@angular/core/testing";

import { SidenavService } from "./side-nav-service.service";

describe("SideNavServiceService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: SidenavService = TestBed.get(SidenavService);
    expect(service).toBeTruthy();
  });
});
