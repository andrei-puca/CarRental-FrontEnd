import { TestBed } from "@angular/core/testing";

import { StateContainerService } from "./state-container.service";

describe("StateContainerService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: StateContainerService = TestBed.get(StateContainerService);
    expect(service).toBeTruthy();
  });
});
