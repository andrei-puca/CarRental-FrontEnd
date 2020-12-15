import { Routes } from "@angular/router";
import { APPROUTES } from "../../app.routes.strings";
import { ToastersComponent } from "./toasters.component";

export const TOASTERS_ROUTES: Routes = [{ path: APPROUTES.toasters, component: ToastersComponent }];
