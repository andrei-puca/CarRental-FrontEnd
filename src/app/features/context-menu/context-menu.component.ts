import { Component, OnInit, ViewChildren, QueryList } from "@angular/core";
import { MatMenuTrigger } from "@angular/material/menu";
import { ContextmenuService } from "../../infrastructure/contextmenu/contextmenu.service";
import { PixelPos } from "../../models/pos";

@Component({
  selector: "app-context-menu",
  templateUrl: "./context-menu.component.html",
})
export class ContextMenuComponent implements OnInit {
  public displayedColumns: string[] = ["id", "url"];

  public itemToUse: { url: string };

  public urls = [
    {
      id: 1,
      url: "https://google.com",
    },
    {
      id: 2,
      url: "https://test.nl",
    },
    {
      id: 3,
      url: "https://rickvanlieshout.com",
    },
  ];

  public constructor(private contextMenuService: ContextmenuService) {}

  public ngOnInit() {
    // Optionally subscribe to the service so it will provide you with
    // global x and y coordinates. use these in your view or specify your own
    this.contextMenuService.subscribe((pos: PixelPos) => {
      this.menuLeft = pos.x;
      this.menuTop = pos.y;
    });
  }

  // declare a trigger and default position for the element
  @ViewChildren(MatMenuTrigger)
  public triggers: QueryList<MatMenuTrigger>;

  public menuLeft = 0;

  public menuTop = 0;

  /**
   * Actual right-mouse click function to bind on the contextmenu event
   *
   * @param event
   * @param val
   * @param args
   */
  public openContextMenu(event, val = "", args?: { url: string }) {
    const myTrigger = this.contextMenuService.prepareTrigger(event, this.triggers, val);

    if (args) {
      this.itemToUse = args;
    }

    myTrigger.openMenu();
  }

  /**
   * context menu functions
   */
  public openGoogle() {
    window.location.href = "https://google.com";
  }

  public openCurrentInTab() {
    window.location.href = this.itemToUse.url;
  }

  public openCurrentInNewTab() {
    window.open(this.itemToUse.url, "_blank");
  }
}
