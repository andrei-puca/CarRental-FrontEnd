import { Routes } from "@angular/router";
import { APPROUTES } from "../../app.routes.strings";
import { VersionComponent } from "./version/version.component";
import { UsComponent } from "./us/us.component";

export const ABOUT_ROUTES: Routes = [
  // about pages
  // this should be refactored to be part of the about route (as heroes will be after merge)
  { path: `${APPROUTES.aboutus}`, component: UsComponent },
  { path: `${APPROUTES.aboutversion}`, component: VersionComponent },
];
