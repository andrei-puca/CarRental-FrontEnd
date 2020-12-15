import { OidcConfigService } from "angular-auth-oidc-client";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { ChangeLanguage } from "app/shared/settings/actions/ChangeLanguage";
import { Store } from "@ngxs/store";
import { ChangeTitle } from "app/shared/settings/actions/ChangeTitle";
import { ChangeToasterSettings } from "app/shared/settings/actions/ChangeToasterSettings";

import Settings from "./Settings";
import { PromisePolyfills } from "../polyfills/promises";
import deepMerge from "deepmerge";

@Injectable({
  providedIn: "root",
})
export class AppSettings {
  public static settings: Settings = {};

  public constructor(
    public http: HttpClient,
    private store: Store, // some settings have to be saved in the store
    public oidcConfigService: OidcConfigService
  ) {}

  /**
   * load the appsettings
   */
  public load() {
    return new Promise<Settings>((resolve, reject) => {
      this.getAndMergeAppsettings().then((result) => {
        AppSettings.settings = result;
        if (AppSettings.settings !== {}) {
          this.store.dispatch(new ChangeLanguage(AppSettings.settings.Language));
          this.store.dispatch(new ChangeTitle(AppSettings.settings.Title));
          this.store.dispatch(new ChangeToasterSettings(AppSettings.settings.Toastr));
          resolve(AppSettings.settings);
        } else {
          reject(`Could not load appsettings`);
        }
      });
    });
  }

  /**
   * Load the STS info from the appsettings
   */
  public loadStsConfig() {
    return new Promise<boolean>((resolve) => {
      this.getAndMergeAppsettings().then((result) => {
        resolve(this.oidcConfigService.load_using_stsServer(result.OIDCSettings.stsServer));
      });
    });
  }

  private getAndMergeAppsettings() {
    return new Promise<Settings>((resolve) => {
      const appSettings = this.http.get("/assets/appsettings.json").toPromise();
      const productionSettings = this.http.get("/assets/appsettings.json").toPromise();

      let result = {};
      PromisePolyfills.AllSettled([appSettings, productionSettings]).then((results) => {
        results.forEach((promiseResult: { status: string; value: any; reason: string }) => {
          if (promiseResult.status === PromisePolyfills.Fulfilled && promiseResult) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            result = deepMerge(result, promiseResult.value);
          }
        });
        resolve(result);
      });
    });
  }
}
