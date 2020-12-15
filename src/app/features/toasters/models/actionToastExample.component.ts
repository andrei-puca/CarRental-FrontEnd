import { Component } from "@angular/core";

import { ToastrService, ToastPackage } from "ngx-toastr";
import { fadeAnimation } from "app/infrastructure/toastr/models/animations/toastAnimations";
import { ActionToastBaseComponent } from "app/infrastructure/toastr/models/actionToasts/actionToastBase.component";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "[app-action-toast]",
  templateUrl: "../.../../../../infrastructure/toastr/models/actionToasts/actionToasts.component.html",
  styleUrls: ["../.../../../../infrastructure/toastr/models/actionToasts/actionToast.component.scss"],
  animations: [fadeAnimation],
  preserveWhitespaces: false,
})
export class ActionToastExampleComponent extends ActionToastBaseComponent {
  public yes = "Mail";

  public no: string;

  public constructor(
    protected toastrService: ToastrService,
    public toastPackage: ToastPackage,
    public translateService: TranslateService
  ) {
    super(toastrService, toastPackage, translateService);
    translateService.get("others.cancel").subscribe((res: string) => {
      this.no = res;
    });
  }

  /**
   *
   * onAction shows a success toast with the proper translation
   */
  public onAction() {
    this.translateService.get("toasters.mailSent").subscribe((res) => {
      this.toastrService.success(res);
    });
  }

  /**
   *
   * onDecline shows a warning toast
   */
  public onDecline() {
    this.translateService.get("toasters.cancelMailing").subscribe((res) => {
      this.toastrService.warning(res);
    });
  }
}
