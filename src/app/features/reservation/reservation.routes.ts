import { Routes } from "@angular/router";
import { APPROUTES } from "../../app.routes.strings";
import { ReservationComponent } from "./reservation.component";
 
export const RESERVATION_ROUTES: Routes = [{ path: APPROUTES.reservation, component: ReservationComponent }];
