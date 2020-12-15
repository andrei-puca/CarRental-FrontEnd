import { Component, OnInit } from "@angular/core";

// 3rd party addons
import { TranslateService } from "@ngx-translate/core";
import { ToastrService, ToastTypes, ToastPositions } from "app/infrastructure/toastr/toastr.service";
import { ActionToastButtonComponent } from "./models/actionToastButton.component";
import { ActionToastExampleComponent } from "./models/actionToastExample.component";
import { ToastProgressAnimation } from "app/infrastructure/toastr/enums/toastProgressAnimation";

@Component({
  selector: "toasters",
  templateUrl: "./toasters.component.html",
  styleUrls: ["./toasters.component.scss"],
})
export class ToastersComponent implements OnInit {
  public constructor(public toastrService: ToastrService, private translateService: TranslateService) {}

  public ngOnInit() {}

  /**
   *
   *  Shows a standard toast (depending on the type passed as argument)
   *  It makes use of the toastrService in order to display our toasts
   *
   * @param {*} type
   */
  public showToast(type) {
    // Shorthands used by the toastrService for the standard toasts
    if (type === "info") {
      this.toastrService.info("information");
    }
    if (type === "success") {
      this.toastrService.success("success");
    }
    if (type === "warning") {
      this.toastrService.warning("warning");
    }
    if (type === "error") {
      this.toastrService.error("error");
    }
  }

  /**
   *
   * Shows a customized toast based on toast type, message and title
   */
  public showDefaultToast() {
    this.translateService.get("toasters").subscribe((res: { defaultMessage: string; defaultTitle: string }) => {
      this.toastrService.show(
        ToastTypes.Default, // Type of toastr
        res.defaultMessage, // Main body Message
        res.defaultTitle // Title
      );
    });
  }

  /**
   *
   * Shows a customized toast with one action button
   */
  public showActionToast() {
    this.translateService.get("toasters").subscribe((res: { buttonMessage: string; buttonTitle: string }) => {
      this.toastrService.show(
        ToastTypes.ActionToast,
        res.buttonMessage,
        res.buttonTitle,
        {},
        ActionToastButtonComponent // pass a custom toast component. When adding a new toastcomponent you must add it to app.module
      );
    });
  }

  /**
   *
   * Shows a customized toast which also has two buttons with separate actions
   */
  public showActionToastTwo() {
    this.translateService.get("toasters").subscribe((res: { actionMessage: string; actionTitle: string }) => {
      this.toastrService.show(
        ToastTypes.ActionToast,
        res.actionMessage,
        res.actionTitle,
        {},
        ActionToastExampleComponent
      );
    });
  }

  /**
   *
   * Shows a customized toast with different settings
   */
  public showOptionsToast() {
    this.translateService.get("toasters").subscribe((res: { optionsMessage: string; optionsTitle: string }) => {
      this.toastrService.show(ToastTypes.Default, res.optionsMessage, res.optionsTitle, {
        positionClass: ToastPositions.BottomLeft,
        progressAnimation: ToastProgressAnimation.Incr,
        timeOut: 0,
        easeTime: 600,
        extendedTimeOut: 3000,
      });
    });
  }
}
