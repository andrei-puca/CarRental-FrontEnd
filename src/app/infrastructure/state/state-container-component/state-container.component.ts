import { OnDestroy, OnInit, AfterContentChecked } from "@angular/core";
import StateContainer from "../state-container/state-container";

export abstract class StateContainerComponent extends StateContainer implements AfterContentChecked, OnInit, OnDestroy {
  /**
   * Tasks to run when component initializes
   */
  public ngOnInit() {
    this.mapStateCalled = true;
    this.mapStateToProps();
  }

  /**
   * Checks whether mapStateToProps has been called
   */
  public ngAfterContentChecked(): void {
    if (!this.mapStateCalled) {
      throw new Error("this.mapStateToProps hasn't been called, did you forget super.ngOnInit()?");
    }
  }

  /**
   * On destroy we unsubscribe all selectors
   */
  public ngOnDestroy(): void {
    this.unsubscribeSelectors();
  }
}
