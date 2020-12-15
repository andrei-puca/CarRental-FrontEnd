import { Component, OnInit, Input, ViewChildren, QueryList } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";

import { SidenavService } from "app/infrastructure/sidenav/side-nav-service.service";
import { ContextmenuService } from "../../infrastructure/contextmenu/contextmenu.service";

import { PixelPos } from "../../models/pos";

import { TranslateService } from "@ngx-translate/core";
import { Language } from "./models/language";

import { ToastrService } from "app/infrastructure/toastr/toastr.service";

import { EditHelpDialogComponent } from "./dialogs/helpDialog.component";
import { StateContainerComponent } from "app/infrastructure/state/state-container-component/state-container.component";
import { SettingsState } from "../settings/settings.state";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { ChangeLanguage } from "../settings/actions/ChangeLanguage";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
})
export class ToolbarComponent extends StateContainerComponent implements OnInit {
  @Select(SettingsState.language)
  public stateLanguage: Observable<string>;

  public selectedLanguage: Language;

  public listLanguages: Language[] = [
    { lang: "en", code: "gb" },
    { lang: "nl", code: "nl" },
  ];

  public itemToUse: any;

  @Input()
  public hideMenu = false;

  @Input()
  public hideToolbarButtons = false;

  public constructor(
    private sidenav: SidenavService,
    private toastrService: ToastrService,
    private translateService: TranslateService,
    private contextMenuService: ContextmenuService,
    private dialog: MatDialog,
    private router: Router,
    private store: Store
  ) {
    super();
  }

  public ngOnInit(): void {
    super.ngOnInit();
    // Optionally subscribe to the service so it will provide you with
    // global x and y coordinates. use these in your view or specify your own
    this.contextMenuService.subscribe((pos: PixelPos) => {
      this.menuLeft = pos.x;
      this.menuTop = pos.y;
    });
  }

  /**
   * Map state selectors to properties
   */
  public mapStateToProps(): void {
    this.bindSelectorToProperty(this.stateLanguage, "selectedLanguage", (val) =>
      this.listLanguages.find((lng: Language) => lng.lang === val)
    );
    this.bindEventToState(this.stateLanguage, () => {
      this.translateService.use(this.selectedLanguage.lang);
    });
  }

  // declare a trigger and default position for the element
  @ViewChildren(MatMenuTrigger)
  public triggers: QueryList<MatMenuTrigger>;

  public menuLeft = 0;

  public menuTop = 0;

  public toggleSideNav() {
    this.sidenav.toggle();
  }

  /**
   * get the translated message before using the toastrService to show it
   * and opens a new tab to the associated link for the page you are on.
   */
  public help() {
    const url = localStorage.getItem(this.router.url);

    if (url) {
      window.open(url, "_blank");
    } else {
      this.translateService.get("others.noLink").subscribe((res: string) => {
        this.toastrService.warning(res);
      });
    }
  }

  /**
   * creates a new Material Dialog with config options
   * This opens up a modal that allows you to edit the help link
   */
  public editHelp() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "350px";

    this.dialog.open(EditHelpDialogComponent, dialogConfig);
  }

  /**
   * sets the language for the appstate/ng-translate and the img for the menu
   *
   * @param {string} language
   */
  public selectLanguage(language: string) {
    this.store.dispatch(new ChangeLanguage(language));
  }

  /**
   * Actual right-mouse click function to bind on the contextmenu event
   *
   * @param event
   * @param val
   * @param args
   */
  public openContextMenu(event, val = "") {
    const myTrigger = this.contextMenuService.prepareTrigger(event, this.triggers, val);

    myTrigger.openMenu();
  }
}
