/**
 * interface which describes a NavItem
 */
export default interface NavItemInterface {
  routerLink: string;
  text: string;
  icon?: string;
  exact?: boolean;
  children?: NavItemInterface[];
  backgroundColor?: string;
  requiresAuthorization?: boolean;
}
