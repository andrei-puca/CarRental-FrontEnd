import { Component, HostBinding, Input } from "@angular/core";

import { Router } from "@angular/router";

import { animate, state, style, transition, trigger } from "@angular/animations";

import { SidenavService } from "../side-nav-service.service";
import { NavItem } from "../nav-item";
import { StateContainerComponent } from "app/infrastructure/state/state-container-component/state-container.component";
import { Select } from "@ngxs/store";
import { SettingsState } from "app/shared/settings/settings.state";
import { Observable } from "rxjs";

@Component({
  selector: "app-nav-button",
  templateUrl: "./nav-button.component.html",
  styleUrls: ["./nav-button.component.scss"],
  animations: [
    trigger("indicatorRotate", [
      state("collapsed", style({ transform: "rotate(0deg)" })),
      state("expanded", style({ transform: "rotate(180deg)" })),
      transition("expanded <=> collapsed", animate("225ms cubic-bezier(0.4,0.0,0.2,1)")),
    ]),
  ],
})
export class NavButtonComponent extends StateContainerComponent {
  @Select(SettingsState) public stateSettings: Observable<any>;

  public expanded: boolean;

  @HostBinding("attr.aria-expanded")
  public ariaExpanded = this.expanded;

  @Input()
  public item: NavItem;

  @Input()
  public depth: number;

  public constructor(public navService: SidenavService, public router: Router) {
    super();
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  /**
   * method which handles nav button click
   *
   * @param item selected item
   */
  public onItemSelected(item: NavItem) {
    if (!item.children || !item.children.length) {
      void this.router.navigate([item.routerLink]);
      void this.navService.close();
    }
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }

  public mapStateToProps(): void {
    // subscribe to state in order to redraw children on authentication change
    // todo: check whether state has changed in order to rerender
    this.bindEventToState(this.stateSettings, () => {
      if (this.item.children !== undefined) {
        this.item.children = [...this.item.children];
      }
    });
  }
}
