import { Routes } from "@angular/router";
import { HomeComponent } from "./features/home";

import { HERO_ROUTES } from "./features/heroes/heroes.routes";
import { APPROUTES } from "./app.routes.strings";
import { ABOUT_ROUTES } from "./features/about/about.routes";
import { CONTEXT_MENU_ROUTES } from "./features/context-menu/contextmenu.routes";
import { TOASTERS_ROUTES } from "./features/toasters/toasters.routes";
import { INPUTS_ROUTES } from "./features/inputs/inputs.routes";
import { PERFECT_SCROLLBAR_ROUTES } from "./features/perfect-scrollbar/perfectscrollbar.routes";
import { UnauthorizedComponent } from "./infrastructure/oidc/unauthorized/unauthorized.component";
import { CLIENT_ROUTES } from './features/client/client.routes';
import { CARS_ROUTES } from './features/cars/cars.routes';
import { RESERVATION_ROUTES } from './features/reservation/reservation.routes';
import { RESERVATIONLIST_ROUTER} from './features/reservationlist/reservationlist.routes';
import { PRICELIST_ROUTER} from  './features/price/price.routes';
import { RENTALLOCATIONS_ROUTES } from './features/rentallocations/rentallocations.routes';
import { CARSMAINTENANCE_ROUTES } from './features/cars/cars-maintenance/cars-maintenance.routes';
import { RECEIVECAR_ROUTES } from './features/cars/receive-cars/receive-cars.routes';
import { CARDETAILS_ROUTES } from './features/cars/car-details/car-details.routes';


export const ROUTES: Routes = [
  { path: APPROUTES.home, component: HomeComponent },

  // feature routes
  ...CARS_ROUTES,
  ...CLIENT_ROUTES,
  ...HERO_ROUTES,
  ...ABOUT_ROUTES,
  ...CONTEXT_MENU_ROUTES,
  ...TOASTERS_ROUTES,
  ...INPUTS_ROUTES,
  ...PERFECT_SCROLLBAR_ROUTES,
  ...RESERVATION_ROUTES,
  ...RESERVATIONLIST_ROUTER,
  ...PRICELIST_ROUTER,
  ...RENTALLOCATIONS_ROUTES,
  ...CARSMAINTENANCE_ROUTES,
  ...RECEIVECAR_ROUTES,
  ...CARDETAILS_ROUTES,

  // unauthorized
  { path: APPROUTES.unauthorized, component: UnauthorizedComponent },
  // else... 404 -> redirect home
  { path: APPROUTES.catchAll, redirectTo: "/" },
];
