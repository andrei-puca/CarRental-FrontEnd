import { Routes } from "@angular/router";
import { APPROUTES } from 'app/app.routes.strings';
import { CarDetailsComponent } from './car-details.component';

 
export const CARDETAILS_ROUTES: Routes = [{ path: APPROUTES.cardetails, component: CarDetailsComponent }];
