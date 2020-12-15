import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../auth.service";
import { ToastrService } from "../../../toastr/toastr.service";
import { TranslateService } from "@ngx-translate/core";
import { AuthenticationState } from "../../state/auth.state";
import { Observable } from "rxjs";
import { Select } from "@ngxs/store";
import { StateContainerComponent } from "app/infrastructure/state/state-container-component/state-container.component";

@Component({
  selector: "app-identity-menu",
  templateUrl: "./identity-menu.component.html",
})
export class IdentityMenuComponent extends StateContainerComponent implements OnInit {
  @Select(AuthenticationState.isAuthenticated)
  public stateAuthentication: Observable<boolean>;

  private isAuthenticated = false;

  public constructor(
    private auth: AuthService,
    private toastrService: ToastrService,
    private translateService: TranslateService
  ) {
    super();
  }

  /**
   * login function
   */
  public login() {
    this.auth.login();
  }

  /**
   * logout function
   */
  public logout() {
    this.auth.logout();
  }

  public mapStateToProps(): void {
    this.bindSelectorToProperty(this.stateAuthentication, "isAuthenticated");
  }
}
