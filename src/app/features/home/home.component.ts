import { Component, OnInit } from "@angular/core";

// 3rd party addons
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "app/infrastructure/toastr/toastr.service";
import { Select, Store } from "@ngxs/store";
import { SettingsState } from "app/shared/settings/settings.state";
import { Observable } from "rxjs";
import { StateContainerComponent } from "app/infrastructure/state/state-container-component/state-container.component";
import { HomeState } from "./state/home.state";
import { ChangeValue } from "./state/actions/ChangeValue";
import { AppSettings } from "app/infrastructure/appsettings";

@Component({
  selector: "home", // <home></home>
  templateUrl: "./home.component.html",
})
export class HomeComponent extends StateContainerComponent implements OnInit {
  @Select(SettingsState.title) public stateTitle: Observable<string>;

  @Select(HomeState.HomeValue) public stateValue: Observable<string>;

  public title = "";

  public value = "";

  public valueInState = "";

  public language = "";

  public constructor(
    public translateService: TranslateService,
    private toastrService: ToastrService,
    public store: Store
  ) {
    super();
  }

  public ngOnInit() {
    super.ngOnInit();
    // get the translation from JSON check for changes, get result
    this.translateService.get("home.helloWorld").subscribe((res: string) => {
      // Because the settings arent loaded fast enough use timeout
      setTimeout(() => {
        this.toastrService.info(res);
      }, 50);
    });
  }

  public submitState(value: string) {
    this.store.dispatch(new ChangeValue(value));
  }

  public homePage() {
    // same as ngOnInit translate above
    this.translateService.get("home.homeToolbar").subscribe((res: string) => {
      this.toastrService.info(res);
    });
  }

  public getSettings() {
    return AppSettings.settings;
  }

  /**
   * Map your properties given a state
   */
  public mapStateToProps = () => {
    this.bindSelectorToProperty(this.stateTitle, "title");
    this.bindSelectorToProperty(this.stateValue, "valueInState");
  };
}
