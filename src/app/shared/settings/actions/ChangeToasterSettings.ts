import { ToastrSettings } from "app/infrastructure/toastr/models/toastrSettingsModel";

export class ChangeToasterSettings {
  public static readonly type = "[Settings] Change Toaster settings";

  public constructor(public settings: ToastrSettings) {}
}
