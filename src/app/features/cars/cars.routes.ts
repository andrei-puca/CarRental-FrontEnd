import { Routes } from "@angular/router";
import { APPROUTES } from "../../app.routes.strings";
import { CarsComponent } from "./cars.component";
 
export const CARS_ROUTES: Routes = [{ path: APPROUTES.cars, component: CarsComponent }];
