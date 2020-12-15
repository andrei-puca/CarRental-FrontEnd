import { Injectable } from "@angular/core";
import { Hero } from "../models/hero";
import { HEROES } from "../heroes.mock";
import { Observable, of } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService, ToastTypes } from "app/infrastructure/toastr/toastr.service";

@Injectable({
  providedIn: "root",
})
export class HeroService {
  public constructor(private translateService: TranslateService, private toastrService: ToastrService) {}

  /**
   * Get all heroes
   */
  public getHeroes(): Observable<Hero[]> {
    // Get the heroes page translations
    // and translate the appropriate messages
    this.translateService.get("heroes.fetched").subscribe((res) => {
      setTimeout(() => {
        this.toastrService.show(ToastTypes.Success, res);
      }, 50);
    });

    return of(HEROES);
  }

  /**
   * get a hero by id
   *
   * @param id id to get the hero by
   */
  public getHero(id: number): Observable<Hero> {
    return of(HEROES.find((hero) => hero.id === id));
  }
}
