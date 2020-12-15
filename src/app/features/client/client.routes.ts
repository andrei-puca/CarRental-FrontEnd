import { Routes } from "@angular/router";
import { APPROUTES } from "../../app.routes.strings";
import { ClientComponent } from "./client.component";
 
export const CLIENT_ROUTES: Routes = [{ path: APPROUTES.client, component: ClientComponent }];
