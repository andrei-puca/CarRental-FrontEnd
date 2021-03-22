import { Routes } from "@angular/router";
import { APPROUTES } from "../../app.routes.strings";
import { ReservationListComponent } from "./reservationlist.component";
 
export const RESERVATIONLIST_ROUTER: Routes = [{ path: APPROUTES.reservationlist, component: ReservationListComponent }];
