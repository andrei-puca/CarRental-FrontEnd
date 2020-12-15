import { NgModule, APP_INITIALIZER, Provider } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule, PreloadAllModules } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HotkeyModule } from "angular2-hotkeys";
import { FlexLayoutModule } from "@angular/flex-layout";
import { OidcSecurityService, OidcConfigService, AuthModule } from "angular-auth-oidc-client";

// 3rd party Localization
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
} from "ngx-perfect-scrollbar";

import { ToastrModule } from "ngx-toastr";
import { AmazingTimePickerModule } from "amazing-time-picker";

// Platform and Environment providers/directives/pipes
import { environment } from "environments/environment";
import { ROUTES } from "./app.routes";

// App is our top level component
import { AppComponent } from "./app.component";
import { HomeComponent } from "./features/home";

// Angular material
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";

import "../styles/styles.scss";

import { ToolbarComponent } from "./shared/toolbar/toolbar.component";
import { HeroesComponent } from "./features/heroes/heroes.component";
import { HeroDetailsComponent } from "./features/heroes/components/hero-details/hero-details.component";
import { SidenavComponent } from "./infrastructure/sidenav/sidenav.component";
import { UsComponent } from "./features/about/us/us.component";
import { VersionComponent } from "./features/about/version/version.component";
import { NavButtonComponent } from "./infrastructure/sidenav/nav-button/nav-button.component";
import { SidenavService } from "./infrastructure/sidenav/side-nav-service.service";
import { RequiresAuthorizationPipe } from "./infrastructure/auth/pipes/requires-authorization.pipe";
import { IdentityMenuComponent } from "./infrastructure/auth/components/identity-menu/identity-menu.component";
import { ContextMenuComponent } from "./features/context-menu/context-menu.component";

import { ToastersComponent } from "./features/toasters/toasters.component";

import { DefaultToastComponent } from "./infrastructure/toastr/models/default.toast";
import { ActionToastExampleComponent } from "./features/toasters/models/actionToastExample.component";
import { ActionToastButtonComponent } from "./features/toasters/models/actionToastButton.component";

import { EditHelpDialogComponent } from "./shared/toolbar/dialogs/helpDialog.component";
import { InputsComponent } from "./features/inputs/inputs.component";
import { PerfectScrollbarExamplesComponent } from "./features/perfect-scrollbar/perfect-scrollbar.component";

import { NgxsModule } from "@ngxs/store";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { SettingsState } from "./shared/settings/settings.state";
import { AuthenticationState } from "./infrastructure/auth/state/auth.state";
import { HomeState } from "./features/home/state/home.state";
import { AppSettings } from "./infrastructure/appsettings";
import { MatPaginatorModule } from '@angular/material/paginator';

// auth components
import { UnauthorizedComponent } from "./infrastructure/oidc/unauthorized/unauthorized.component";
import { AuthGuardService } from "./infrastructure/oidc/auth-guard.service";
import { AuthInterceptor } from "./infrastructure/oidc/auth.interceptor";
import { ClientComponent } from './features/client/client.component';
import { CarsComponent } from './features/cars/cars.component';



// initialize the app settings
export function initializeSettings(appSettings: AppSettings) {
  return () => appSettings.load();
}

// OIDC config
export function loadConfig(appSettings: AppSettings) {
  return () => appSettings.loadStsConfig();
}

// Localization | AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: false,
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HomeComponent,
    SidenavComponent,
    ToolbarComponent,
    HeroesComponent,
    HeroDetailsComponent,
    NavButtonComponent,
    UsComponent,
    VersionComponent,
    ContextMenuComponent,
    RequiresAuthorizationPipe,
    IdentityMenuComponent,
    DefaultToastComponent,
    ActionToastExampleComponent,
    ActionToastButtonComponent,
    ToastersComponent,
    EditHelpDialogComponent,
    InputsComponent,
    PerfectScrollbarExamplesComponent,
    UnauthorizedComponent,
    ClientComponent,
    CarsComponent,

  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    FlexLayoutModule,
    AmazingTimePickerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    HotkeyModule.forRoot(),
    RouterModule.forRoot(ROUTES, {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules,
    }),
    NgxsModule.forRoot([SettingsState, AuthenticationState, HomeState], {
      developmentMode: !environment.production,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot({
      collapsed: true,
      disabled: environment.production,
    }),
    AuthModule.forRoot(),
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    PerfectScrollbarModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
  ],
  /**
   * Expose our Services and Providers into Angulars dependency injection.
   */
  providers: [
    environment.ENV_PROVIDERS,
    AppSettings,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeSettings,
      deps: [AppSettings],
      multi: true,
    },
    // OidcSecurityService,
    // OidcConfigService,
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: loadConfig,
    //   deps: [AppSettings],
    //   multi: true,
    // },
    SidenavService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ] as Provider[],
  entryComponents: [
    DefaultToastComponent,
    ActionToastExampleComponent,
    ActionToastButtonComponent,
    EditHelpDialogComponent,
  ],
})
export class AppModule {}
