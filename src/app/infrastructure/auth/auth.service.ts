import { Injectable, OnDestroy } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { AuthenticationState } from "./state/auth.state";
import { Observable, Subscription } from "rxjs";
import { ChangeAuthentication } from "./state/actions/Authenticate";
import { StateContainerService } from "../state/state-container-service/state-container.service";
import { OidcSecurityService } from "angular-auth-oidc-client";
import { filter, take } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService extends StateContainerService implements OnDestroy {
  @Select(AuthenticationState.isAuthenticated)
  public stateAuthentication: Observable<boolean>;

  private authenticated = false;

  private isAuthorizedObservable: Observable<boolean>;
  private isAuthorizedSubscription: Subscription;

  public constructor(public store: Store, private oidcSecurityService: OidcSecurityService) {
    super();
    this.oidcSecurityService
      .getIsModuleSetup()
      .pipe(
        filter((isModuleSetup: boolean) => isModuleSetup),
        take(1)
      )
      .subscribe(() => {
        this.doCallbackLogicIfRequired();
      });

    this.isAuthorizedObservable = this.oidcSecurityService.getIsAuthorized();
    this.isAuthorizedSubscription = this.isAuthorizedObservable.subscribe((auth) => {
      this.setAuthentication(auth);
    });
  }

  public ngOnDestroy() {
    this.isAuthorizedSubscription.unsubscribe();
  }

  private doCallbackLogicIfRequired() {
    if (window.location.hash) {
      this.oidcSecurityService.authorizedImplicitFlowCallback();
    }
  }

  /**
   * return whether the user is authenticated
   */
  public isAuthenticated() {
    return this.authenticated;
  }

  /**
   * check whether the user has privileges to perform an action
   */
  public isAuthorized() {
    return this.authenticated;
  }

  /**
   * Function to log in
   */
  public login() {
    this.oidcSecurityService.authorize();
  }

  /**
   * Function to log out
   */
  public logout() {
    this.oidcSecurityService.logoff();
    this.setAuthRedirectUrl("/");
  }

  /**
   * Change authentication in state
   *
   * @param isAuthorized
   */
  private setAuthentication(isAuthorized: boolean) {
    this.store.dispatch(new ChangeAuthentication(isAuthorized));
  }

  /**
   * Get the redirect url from a datastore
   */
  public getAuthRedirectUrl(): string {
    const data = sessionStorage.getItem("redirect");
    if (data != null) {
      return data;
    } else {
      return "";
    }
  }

  /**
   * set the redirect url in a datastore
   *
   * @param value value to store
   */
  public setAuthRedirectUrl(value: any): void {
    sessionStorage.setItem("redirect", value);
  }

  /**
   * Map state to properties
   */
  public mapStateToProps(): void {
    this.bindSelectorToProperty(this.stateAuthentication, "authenticated");
  }
}
