import { State, Selector, Action, StateContext } from "@ngxs/store";
import SettingsModel from "./models/SettingsModel";
import { ChangeLanguage } from "./actions/ChangeLanguage";
import { ChangeTitle } from "./actions/ChangeTitle";
import { ChangeToasterSettings } from "./actions/ChangeToasterSettings";
import { Injectable } from "@angular/core";

@State<SettingsModel>({
  name: "settings",
  defaults: {
    Title: "",
    Toastr: {},
    Language: "en",
  },
})
@Injectable()
export class SettingsState {
  @Selector()
  public static title(state: SettingsModel) {
    return state.Title;
  }

  @Selector()
  public static language(state: SettingsModel) {
    return state.Language;
  }

  @Selector()
  public static ToasterSettings(state: SettingsModel) {
    return state.Toastr;
  }

  /**
   * Change the toaster settings
   *
   * @param ctx
   * @param action
   */
  @Action(ChangeToasterSettings)
  public changeToasterSettings(ctx: StateContext<SettingsModel>, action: ChangeToasterSettings) {
    ctx.patchState({
      Toastr: action.settings,
    });
  }

  /**
   * Change the application Language
   *
   * @param ctx stateContext
   * @param action action to perform
   */
  @Action(ChangeLanguage)
  public changeLanguage(ctx: StateContext<SettingsModel>, action: ChangeLanguage) {
    ctx.patchState({
      Language: action.language,
    });
  }

  /**
   * Change the application title
   *
   * @param ctx stateContext
   * @param action action to perform
   */
  @Action(ChangeTitle)
  public changeTitle(ctx: StateContext<SettingsModel>, action: ChangeTitle) {
    ctx.patchState({
      Title: action.title,
    });
  }
}
