import NavItemInterface from "./interfaces/navItem";
import { RequiresAuthorization } from "../auth/interfaces/require-authorization";

export class NavItem implements NavItemInterface, RequiresAuthorization {
  public routerLink: string;

  public text: string;

  public icon?: string;

  public exact?: boolean;

  public children?: NavItemInterface[];

  public backgroundColor?: string;

  public requiresAuthorization = false;
}
