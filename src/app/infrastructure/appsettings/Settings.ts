import { ToastrSettings } from "../toastr/models/toastrSettingsModel";
import { BackendPaths } from "./models/BackendSettings";
import { OIDCSettings } from "./OIDCSettings";

export default interface Settings {
  Title?: string;
  Toastr?: ToastrSettings;
  Language?: string;
  BackendBaseUrl?: string;
  BackendPaths?: BackendPaths;
  OIDCSettings?: OIDCSettings;
}
