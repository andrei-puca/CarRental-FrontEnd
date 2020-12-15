import { Routes } from "@angular/router";
import { HeroesComponent } from "./heroes.component";
import { HeroDetailsComponent } from "./components/hero-details/hero-details.component";
import { APPROUTES } from "../../app.routes.strings";
import { AuthGuardService } from "app/infrastructure/oidc/auth-guard.service";

export const HERO_ROUTES: Routes = [
  { path: APPROUTES.heroes, component: HeroesComponent, canActivate: [AuthGuardService] },
  { path: `${APPROUTES.heroes}/:id`, component: HeroDetailsComponent, canActivate: [AuthGuardService] },
];
