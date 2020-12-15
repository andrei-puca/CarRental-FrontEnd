import { Injectable } from "@angular/core";
import { ToastrService as ngxToastrService, ToastrConfig } from "ngx-toastr";

import { ToastrSettings } from "./models/toastrSettingsModel";
import { TranslateService } from "@ngx-translate/core";

// Imported & Exported for use in components
import { ToastTypes } from "./enums/toastTypes";

// Custom Toast
import { DefaultToastComponent } from "./models/default.toast";
import { Select } from "@ngxs/store";
import { SettingsState } from "app/shared/settings/settings.state";
import { Observable } from "rxjs";
import { StateContainerService } from "../state/state-container-service/state-container.service";

export { ToastTypes } from "./enums/toastTypes";
export { ToastPositions } from "./enums/toastPositions";
export { ToastProgressAnimation } from "./enums/toastProgressAnimation.ts";

@Injectable({
  providedIn: "root",
})
export class ToastrService extends StateContainerService {
  @Select(SettingsState.ToasterSettings)
  public stateSettings: Observable<ToastrSettings>;

  /**
   * Creates an instance of ToastrService.
   *
   * @param {ngxToastrService} toastrService
   * @param {TranslateService} translateService
   * @memberof ToastrService
   */
  public constructor(private toastrService: ngxToastrService, private translateService: TranslateService) {
    super(true);
    this.mapStateToProps();
  }

  /**
   *
   * @param type  required type
   * @param message required message
   * @param title optional title
   * @param settings optional settings
   * @param toast optional custom toast
   */
  public show(
    type: ToastTypes = ToastTypes.Info,
    message: string,
    title?: string,
    settings?: ToastrSettings,
    toast?: any
  ) {
    const config = {
      ...this.toastrService.toastrConfig,
      ...settings,
    } as ToastrConfig;

    switch (type) {
      case ToastTypes.Default:
        config.toastComponent = DefaultToastComponent;
        break;

      case ToastTypes.ActionToast:
        if (toast !== undefined && toast !== null) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          config.toastComponent = toast;
        } else {
          this.translateService.get("others.noToast").subscribe((res) => {
            throw new Error(res);
          });
        }

        break;

      default:
        break;
    }

    this.toastrService.show(message, title, config, type);
  }

  /**
   * the shorthand methods for show
   * success shows a green toast with checkmark icon
   *
   * @param {string} message
   * @param {string} [title]
   * @param {ToastrSettings} [settings]
   */
  public success(message: string, title?: string, settings?: ToastrSettings) {
    this.show(ToastTypes.Success, message, title, settings);
  }

  /**
   * info shows a blue toast with a info icon
   *
   * @param {string} message
   * @param {string} [title]
   * @param {ToastrSettings} [settings]
   */
  public info(message: string, title?: string, settings?: ToastrSettings) {
    this.show(ToastTypes.Info, message, title, settings);
  }

  /**
   * warning shows a yellow toast with a warning icon
   *
   * @param {string} message
   * @param {string} [title]
   * @param {ToastrSettings} [settings]
   */
  public warning(message: string, title?: string, settings?: ToastrSettings) {
    this.show(ToastTypes.Warning, message, title, settings);
  }

  /**
   * warning shows a red toast with a X icon
   *
   * @param {string} message
   * @param {string} [title]
   * @param {ToastrSettings} [settings]
   */
  public error(message: string, title?: string, settings?: ToastrSettings) {
    this.show(ToastTypes.Error, message, title, settings);
  }

  /**
   * Map state values to toaster config
   */
  public mapStateToProps(): void {
    this.bindSelectorToProperty(
      this.stateSettings,
      "toastrService.toastrConfig",
      (val) =>
        ({
          ...this.toastrService.toastrConfig,
          ...val,
        } as ToastrConfig)
    );
  }
}
