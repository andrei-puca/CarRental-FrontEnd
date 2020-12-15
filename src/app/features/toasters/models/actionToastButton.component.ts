import { Component } from "@angular/core";
import { ToastrService, ToastPackage } from "ngx-toastr";
import { fadeAnimation } from "app/infrastructure/toastr/models/animations/toastAnimations";
import { ButtonToastBaseComponent } from "app/infrastructure/toastr/models/buttonToast/buttonToast.component";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "[app-action-toast]",
  templateUrl: "../.../../../../infrastructure/toastr/models/buttonToast/buttonToast.component.html",
  styleUrls: ["../.../../../../infrastructure/toastr/models/buttonToast/buttonToast.component.scss"],
  animations: [fadeAnimation],
  preserveWhitespaces: false,
})
export class ActionToastButtonComponent extends ButtonToastBaseComponent {
  /**
   * Base class for Button Toast which cannot be instantiated
   *
   * @param toastrService
   * @param toastPackage
   * @param translateService
   */
  public constructor(
    protected toastrService: ToastrService,
    public toastPackage: ToastPackage,
    public translateService: TranslateService
  ) {
    super(toastrService, toastPackage, translateService);
    this.translateService.get("toasters.click").subscribe((res: string) => {
      this.click = res;
    });
  }

  /**
   *
   * a method for the action button that shows info toast
   */
  public onClick() {
    this.translateService.get("toasters.helloWorld").subscribe((res) => {
      this.toastrService.info(res);
    });
  }
}
