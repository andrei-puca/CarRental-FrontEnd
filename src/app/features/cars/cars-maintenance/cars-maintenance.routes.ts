import { Routes } from "@angular/router";
import { APPROUTES } from 'app/app.routes.strings';
import { CarsMaintenanceComponent } from './cars-maintenance.component';


export const CARSMAINTENANCE_ROUTES: Routes = [{ path: APPROUTES.carsmaintenance, component: CarsMaintenanceComponent }];
