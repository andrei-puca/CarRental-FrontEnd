import { Routes } from "@angular/router";
import { APPROUTES } from "../../app.routes.strings";
import { ContextMenuComponent } from "./context-menu.component";

export const CONTEXT_MENU_ROUTES: Routes = [
  // about pages
  // this should be refactored to be part of the about route (as heroes will be after merge)
  { path: `${APPROUTES.contextmenus}`, component: ContextMenuComponent },
];
