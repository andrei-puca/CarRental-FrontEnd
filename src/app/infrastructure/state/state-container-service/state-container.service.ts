import { Injectable, OnDestroy } from "@angular/core";
import StateContainer from "../state-container/state-container";

@Injectable({
  providedIn: "root",
})
export abstract class StateContainerService extends StateContainer implements OnDestroy {
  public constructor(delayStateProps = false) {
    super();
    if (!delayStateProps) {
      this.mapStateToProps();
    }
  }

  public ngOnDestroy(): void {
    this.unsubscribeSelectors();
  }
}
