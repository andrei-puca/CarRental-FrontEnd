import { Routes } from "@angular/router";
import { APPROUTES } from "../../app.routes.strings";
import { PriceComponent } from "./price.component";
 
export const PRICELIST_ROUTER: Routes = [{ path: APPROUTES.pricelist, component: PriceComponent }];
