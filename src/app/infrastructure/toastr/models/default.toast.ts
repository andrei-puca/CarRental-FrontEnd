import { Component } from "@angular/core";

import { Toast, ToastrService, ToastPackage } from "ngx-toastr";
import { fadeAnimation } from "./animations/toastAnimations";

@Component({
  selector: "[default-toast-component]",
  templateUrl: "./default.toast.html",
  styleUrls: ["./default.toast.scss"],
  animations: [fadeAnimation],
  preserveWhitespaces: false,
})
export class DefaultToastComponent extends Toast {
  public undoString = "undo";

  /**
   *
   * this is the component config for the default toast
   */
  public constructor(protected toastrService: ToastrService, public toastPackage: ToastPackage) {
    super(toastrService, toastPackage);
  }

  /**
   *
   * A action for the default toast close button
   * this can be further customized if needed
   *
   * @param {Event} event
   * @param {string} message
   * @returns
   */
  public action(event: Event, message: string) {
    event.stopPropagation();
    this.toastrService.info(message);
    this.undoString = "undid";
    this.toastPackage.triggerAction();
    return false;
  }
}
