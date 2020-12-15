export class ChangeLanguage {
  public static readonly type = "[Settings] Change Language";

  public constructor(public language: string) {}
}
