export class ChangeValue {
  public static readonly type = "[Home] Change state value";

  public constructor(public newValue: string) {}
}
