import { Component } from "@angular/core";

import { Toast, ToastrService, ToastPackage } from "ngx-toastr";
import { fadeAnimation } from "../animations/toastAnimations";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "[action-toast-component]",
  templateUrl: "./actionToasts.component.html",
  styleUrls: ["./actionToast.component.scss"],
  animations: [fadeAnimation],
  preserveWhitespaces: false,
})
export abstract class ActionToastBaseComponent extends Toast {
  public yes = "yes";

  public no = "no";

  /**
   *
   * this is the base component config for the action toast which cannot be instantiated
   */
  public constructor(
    protected toastrService: ToastrService,
    public toastPackage: ToastPackage,
    public translateService: TranslateService
  ) {
    super(toastrService, toastPackage);
  }

  /**
   *
   * method for upperright button of the toast
   * shows error if no function has been passed along
   */
  public onAction() {
    this.translateService.get("others.noFunc").subscribe((res) => {
      throw new Error(res);
    });
  }

  /**
   *
   * method for bottomright button of the toast
   * shows error if no function has been passed along
   */
  public onDecline() {
    this.translateService.get("others.noFunc").subscribe((res) => {
      throw new Error(res);
    });
  }
}
