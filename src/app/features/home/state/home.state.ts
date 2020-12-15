import { State, Selector, Action, StateContext } from "@ngxs/store";
import HomeModel from "./models/HomeModel";
import { ChangeValue } from "./actions/ChangeValue";
import produce from "immer";
import { Injectable } from "@angular/core";

@State<HomeModel>({
  name: "home",
  defaults: {
    Value: "",
  },
})
@Injectable()
export class HomeState {
  public constructor() {}

  @Selector()
  public static HomeValue(state: HomeModel) {
    return state.Value;
  }

  /**
   * Change the home value
   *
   * @param ctx
   * @param action
   */
  @Action(ChangeValue)
  public changeToasterSettings(ctx: StateContext<HomeModel>, action: ChangeValue) {
    // /**
    //  * Change value using the default ngxs patchState (efficient for easy changes)
    //  */
    // ctx.patchState({
    //   Value: action.newValue
    // });

    /**
     * Change the value with immer, easier for larger modifications
     * Produce gives us a draft object which is a PLAIN JS object.
     * We can use the curried method to modify this object in ANY way we want and the
     * object will automatically be returned with the new changes reflected.
     */
    ctx.setState(
      produce((draft) => {
        draft.Value = action.newValue;
      })
    );
  }
}
