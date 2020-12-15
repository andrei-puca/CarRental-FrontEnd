export class ChangeAuthentication {
  public static readonly type = "[Authentication] Authenticate change";

  public constructor(public isAuthenticated: boolean) {}
}
