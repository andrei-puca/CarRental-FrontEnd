import { Routes } from "@angular/router";
import { APPROUTES } from "../../app.routes.strings";
import { PerfectScrollbarExamplesComponent } from "./perfect-scrollbar.component";

export const PERFECT_SCROLLBAR_ROUTES: Routes = [
  { path: `${APPROUTES.perfectscrollbar}`, component: PerfectScrollbarExamplesComponent },
];
