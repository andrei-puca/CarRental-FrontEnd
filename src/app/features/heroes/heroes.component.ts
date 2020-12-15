import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { Hero } from "./models/hero";
import { HeroService } from "./services/hero.service";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { APPROUTES } from "../../app.routes.strings";

import { HotkeysService, Hotkey } from "angular2-hotkeys";

import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "app/infrastructure/toastr/toastr.service";
import { ClickService } from "app/infrastructure/click-service/click.service";

@Component({
  selector: "app-heroes",
  templateUrl: "./heroes.component.html",
})
export class HeroesComponent implements OnInit, OnDestroy {
  public heroRouteString = APPROUTES.heroes;

  public heroes: MatTableDataSource<Hero>;

  public displayedColumns: string[] = ["id", "name", "skill"];

  @ViewChild(MatSort, { static: false })
  public sort: MatSort;

  public constructor(
    private heroService: HeroService,
    private router: Router,
    private hotkeyService: HotkeysService,
    private translateService: TranslateService,
    private toastrService: ToastrService
  ) {
    this.setUpHotKeys();
  }

  public ngOnInit() {
    this.getHeroes();
  }

  /**
   * subscribe to the heroes service
   */
  private getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => {
      this.heroes = new MatTableDataSource(heroes);
      this.heroes.sort = this.sort;
    });
  }

  /**
   * row click action (redirect to specific hero)
   *
   * @param row
   */
  public open(row: Hero) {
    if (ClickService.isActualClick()) {
      this.router.navigate([`/${this.heroRouteString}/${row.id}`]);
    } else {
      console.debug("Text has been selected");
    }
  }

  /**
   * check whether event.checked is true/false and add/remove the skill row
   *
   * @param event checkbox event (slider)
   */
  public toggleSkills(event: { checked: boolean }) {
    if (event.checked) {
      if (!this.displayedColumns.some((item) => item === "skill")) {
        this.displayedColumns.push("skill");
      }
    } else {
      const index = this.displayedColumns.indexOf("skill");
      if (index > -1) {
        this.displayedColumns.splice(index, 1);
      }
    }
  }

  /**
   * set up the hotkeys for this app
   */
  public setUpHotKeys(): any {
    this.hotkeyService.add(
      new Hotkey(
        "alt+shift+s",
        (): boolean => {
          // get the translation from JSON. Check for changes then get the result

          // Show the translation with the toastrService
          this.translateService.get("heroes.shazam").subscribe((res: string) => {
            this.toastrService.success(res);
          });
          return false; // Prevent bubbling
        },
        undefined,
        "Call Shazam"
      )
    );
  }

  /**
   * Remove hotkeys when exiting the component
   */
  public removeHotKeys() {
    const hk = this.hotkeyService.get("alt+shift+s");
    this.hotkeyService.remove(hk);
  }

  /** fires when component is unloaded */
  public ngOnDestroy(): void {
    this.removeHotKeys();
  }
}
