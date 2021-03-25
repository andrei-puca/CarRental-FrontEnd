import { Routes } from "@angular/router";
import { APPROUTES } from 'app/app.routes.strings';
import { ReceiveCarsComponent } from './receive-cars.component';


export const RECEIVECAR_ROUTES: Routes = [{ path: APPROUTES.receivecar, component: ReceiveCarsComponent }];
