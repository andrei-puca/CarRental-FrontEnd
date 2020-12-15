import { Component } from "@angular/core";
import { NavItems } from "../../app.navigation";
import { SidenavService } from "./side-nav-service.service";

import { NavItem } from "./nav-item";
import { StateContainerComponent } from "../state/state-container-component/state-container.component";
import { Select } from "@ngxs/store";
import { SettingsState } from "app/shared/settings/settings.state";
import { Observable } from "rxjs";
import { AuthenticationState } from "../auth/state/auth.state";

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
})
export class SidenavComponent extends StateContainerComponent {
  @Select(SettingsState.title) public stateTitle: Observable<any>;

  @Select(AuthenticationState) public authState: Observable<any>;

  public title = "";

  public navItems: NavItem[] = NavItems;

  public constructor(public sidenavService: SidenavService) {
    super();
  }

  public mapStateToProps(): void {
    this.bindSelectorToProperty(this.stateTitle, "title");
    this.bindEventToState(this.authState, () => {
      this.navItems = [...NavItems];
    });
  }

  /**
   * Method for closing the sidebar
   * We bind this to each menu item
   */
  public closeSidenav() {
    void this.sidenavService.close();
  }
}
