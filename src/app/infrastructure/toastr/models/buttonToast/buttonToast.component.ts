import { Component } from "@angular/core";

import { Toast, ToastrService, ToastPackage } from "ngx-toastr";
import { fadeAnimation } from "../animations/toastAnimations";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "[button-toast-component]",
  templateUrl: "./buttonToast.component.html",
  styleUrls: ["./buttonToast.component.scss"],
  animations: [fadeAnimation],
  preserveWhitespaces: false,
})
export abstract class ButtonToastBaseComponent extends Toast {
  public click = "Go";

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
  public onClick() {
    this.translateService.get("others.noFunc").subscribe((res) => {
      throw new Error(res);
    });
  }
}
