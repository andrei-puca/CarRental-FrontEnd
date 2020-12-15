/**
 * Angular 2 decorators and services
 */
import { environment } from "../environments/environment";
import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { AppSettings } from "./infrastructure/appsettings";
import { SidenavService } from "./infrastructure/sidenav/side-nav-service.service";
import {
  ConfigResult,
  OidcConfigService,
  OidcSecurityService,
  OpenIdConfiguration,
  AuthorizationState,
  AuthorizationResult,
} from "angular-auth-oidc-client";
import { APPROUTES } from "./app.routes.strings";
import { TranslateService } from "@ngx-translate/core"; // Translate Service required to translate
import { OIDCSettings } from "./infrastructure/appsettings/OIDCSettings";
import { Router, NavigationCancel, NavigationEnd, NavigationError, NavigationStart } from "@angular/router";
import { AuthService } from "./infrastructure/auth/auth.service";

export const ROOT_SELECTOR = "app";

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: ROOT_SELECTOR,
  encapsulation: ViewEncapsulation.None,
  templateUrl: "./app.component.html",
  providers: [AppSettings],
})
export class AppComponent implements OnInit {
  @ViewChild("sidenav", { static: true })
  public sidenav: MatSidenav;

  public loading = false;

  public constructor(
    private sidenavService: SidenavService,
    public appSettings: AppSettings,
    private translateService: TranslateService,
    private oidcConfigService: OidcConfigService,
    public oidcSecurityService: OidcSecurityService,
    private router: Router,
    private authService: AuthService
  ) {
    this.subscribeToRouter();

    // after config load we want to connect (to see if user is already logged in)
    this.oidcConfigService.onConfigurationLoaded.subscribe((configResult: ConfigResult) => {
      this.connectToSTS({ ...AppSettings.settings.OIDCSettings }, configResult);
    });

    if (this.oidcSecurityService.moduleSetup) {
      this.onOidcModuleSetup();
    } else {
      this.oidcSecurityService.onModuleSetup.subscribe(() => {
        this.onOidcModuleSetup();
      });
    }

    this.oidcSecurityService.onAuthorizationResult.subscribe((authorizationResult: AuthorizationResult) => {
      this.onAuthorizationResultComplete(authorizationResult);
    });
  }

  public ngOnInit() {
    // Sets the default Language for ngx-translate
    this.translateService.setDefaultLang("en");
    this.sidenavService.setSidenav(this.sidenav);
  }

  /**
   * Set up a connection to the STS to verify user authentication
   *
   * @param data
   * @param configResult
   */
  private connectToSTS(data: OIDCSettings, configResult: ConfigResult) {
    try {
      const isDevelopmentEnv = !environment.production;

      const { webhost, stsServer, clientId, scopes } = data;

      /* eslint-disable camelcase */
      const openIDImplicitFlowConfiguration: OpenIdConfiguration = {
        stsServer,
        redirect_url: `${webhost}`,
        client_id: clientId,
        response_type: "id_token token",
        scope: `openid profile ${scopes}`,
        post_logout_redirect_uri: `${webhost}`,
        storage: localStorage,
        silent_renew: true,
        silent_renew_url: `${webhost}/silent-renew.html`,
        post_login_route: "/",
        forbidden_route: `/${APPROUTES.forbidden}`,
        unauthorized_route: `/${APPROUTES.unauthorized}`,
        trigger_authorization_result_event: true,
        log_console_warning_active: isDevelopmentEnv,
        log_console_debug_active: isDevelopmentEnv,
        max_id_token_iat_offset_allowed_in_seconds: 20,
      };
      /* eslint-enable camelcase */

      this.oidcSecurityService.setupModule(openIDImplicitFlowConfiguration, configResult.authWellknownEndpoints);
      this.oidcSecurityService.onAuthorizationResult.subscribe((authorizationResult: AuthorizationResult) => {
        this.onAuthorizationResultComplete(authorizationResult);
      });
    } catch (e) {
      console.error("can't connect to STS ... -> retrying", e);

      setTimeout(() => {
        this.connectToSTS(data, configResult);
      }, 500);
    }
  }

  /**
   * Subscribe to router events and handle them
   */
  private subscribeToRouter() {
    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          // when navigation starts, display loading icon
          this.loading = true;

          const myEvent = event as NavigationStart;
          // Save the route to sessionstorage so we can retrieve what route users were on after
          // authentication
          if (
            ![`/${APPROUTES.unauthorized}`, `/${APPROUTES.forbidden}`, "/silent-renew.html"].includes(myEvent.url) &&
            !myEvent.url.includes("#id_token")
          ) {
            this.authService.setAuthRedirectUrl(myEvent.url);
          }
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        // don't do anything if a random event fires
        default: {
          break;
        }
      }
    });
  }

  /**
   * Runs on the OidcModuleSetup.start event
   */
  private onOidcModuleSetup() {
    if (window.location.hash) {
      this.oidcSecurityService.authorizedImplicitFlowCallback();
    }
  }

  /**
   * Runs whenever the oidcservice returns an Authorizationresult
   *
   * @param authorizationResult
   */
  private onAuthorizationResultComplete(authorizationResult: AuthorizationResult) {
    if (authorizationResult.authorizationState === AuthorizationState.authorized) {
      this.router.navigateByUrl(this.authService.getAuthRedirectUrl());
    } else {
      this.router.navigate([[APPROUTES.unauthorized]]);
    }
  }
}
