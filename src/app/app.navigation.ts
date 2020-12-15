import { APPROUTES } from "./app.routes.strings";
import { NavItem } from "./infrastructure/sidenav/nav-item";

export const NavItems: NavItem[] = [
  
  {
    icon: "home",
    text: "nav.cars",
    routerLink: APPROUTES.cars,
    exact: false,
    requiresAuthorization: false,
  },
  {
    icon: "home",
    text: "nav.client",
    routerLink: APPROUTES.client,
    exact: false,
    requiresAuthorization: false,
  },
  
  
  {
    icon: "home",
    text: "nav.home",

    routerLink: APPROUTES.home,
    exact: true,
    requiresAuthorization: false,
  },
  {
    icon: "face",
    text: "nav.heroes",
    routerLink: APPROUTES.heroes,
    exact: false,
    requiresAuthorization: true,
  },
  {
    icon: "more_horiz",
    text: "nav.contextmenus",
    routerLink: APPROUTES.contextmenus,
    requiresAuthorization: false,
    exact: false,
  },
  {
    icon: "notifications",
    text: "Toasters",
    routerLink: APPROUTES.toasters,
    exact: false,
    requiresAuthorization: false,
  },
  {
    icon: "check_box",
    text: "Inputs",
    routerLink: APPROUTES.inputs,
    exact: false,
    requiresAuthorization: false,
  },
  {
    icon: "autorenew",
    text: "nav.perfectscrollbar",
    routerLink: APPROUTES.perfectscrollbar,
    requiresAuthorization: false,
    exact: false,
  },
  {
    icon: "perm_identity",
    text: "nav.about",
    routerLink: APPROUTES.about,
    exact: false,
    requiresAuthorization: false,
    children: [
      {
        icon: "contacts",
        requiresAuthorization: false,
        text: "nav.aboutUs",
        routerLink: APPROUTES.aboutus,
        exact: false,
        backgroundColor: "pink",
      },
      {
        icon: "perm_scan_wifi",
        requiresAuthorization: false,
        text: "nav.version",
        routerLink: APPROUTES.aboutversion,
        exact: false,
      },
    ],
  },
  {
    icon: "perm_identity",
    text: "nav.hiddenByChildren",
    routerLink: APPROUTES.about,
    exact: false,
    requiresAuthorization: false,
    children: [
      {
        icon: "contacts",
        requiresAuthorization: true,
        text: "nav.aboutUs",
        routerLink: APPROUTES.aboutus,
        exact: false,
      },
    ],
  },
];
