import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Hero } from "../../models/hero";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { HeroService } from "../../services/hero.service";
import { Hotkey, HotkeysService } from "angular2-hotkeys";

@Component({
  selector: "app-hero-details",
  templateUrl: "./hero-details.component.html",
})
export class HeroDetailsComponent implements OnInit, OnDestroy {
  @Input()
  public hero: Hero;

  public constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private hotkeyService: HotkeysService
  ) {}

  public ngOnInit() {
    this.getHero();
    this.setUpHotKeys();
  }

  /**
   * Get a specific hero
   */
  public getHero(): void {
    const id = parseInt(this.route.snapshot.paramMap.get("id"), 2);
    this.heroService.getHero(id).subscribe((hero) => (this.hero = hero));
  }

  /**
   * Function to go back easily
   */
  public goBack(): void {
    this.location.back();
  }

  /**
   * set up the hotkeys for this app
   */
  public setUpHotKeys(): any {
    this.hotkeyService.add(
      new Hotkey(
        "alt+s",
        (): boolean => {
          console.debug("saving hero");
          this.goBack();
          return false; // Prevent bubbling
        },
        undefined,
        "Save hero"
      )
    );
  }

  /**
   * Remove hotkeys when exiting the component
   */
  public removeHotKeys() {
    const hk = this.hotkeyService.get("alt+s");
    this.hotkeyService.remove(hk);
  }

  /** fires when component is unloaded */
  public ngOnDestroy(): void {
    this.removeHotKeys();
  }
}
