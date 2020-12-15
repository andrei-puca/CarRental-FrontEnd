import { State, Selector, Action, StateContext } from "@ngxs/store";
import AuthModel from "./models/AuthModel";
import { ChangeAuthentication } from "./actions/Authenticate";
import { Injectable } from "@angular/core";

@State<AuthModel>({
  name: "authentication",
  defaults: {
    isAuthenticated: false,
  },
})
@Injectable()
export class AuthenticationState {
  public constructor() {}

  @Selector()
  public static isAuthenticated(state: AuthModel) {
    return state.isAuthenticated;
  }

  /**
   * Change the authentication state
   *
   * @param ctx
   * @param action
   */
  @Action(ChangeAuthentication)
  public Authenticate(ctx: StateContext<AuthModel>, action: ChangeAuthentication) {
    ctx.patchState({
      isAuthenticated: action.isAuthenticated,
    });
  }
}
