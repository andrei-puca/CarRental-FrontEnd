import { ToastrSettings } from "app/infrastructure/toastr/models/toastrSettingsModel";

export default interface SettingsModel {
  Title: string;
  Toastr: ToastrSettings;
  Language: string;
}
