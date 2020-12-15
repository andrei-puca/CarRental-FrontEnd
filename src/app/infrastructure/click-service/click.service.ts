import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export abstract class ClickService {
  public constructor() {}

  /**
   * Checks whether user clicked an item instead of selected the text
   *
   * USAGE:
   *
   * in the function that you register on (click)='' you do:
   *
   * if(ClickService.isActualClick()){
   *    // handle click
   * }
   *
   */
  public static isActualClick() {
    return this.getSelectionString().length === 0;
  }

  /**
   * Checks whether user selected text instead of clicked the item
   *
   * USAGE:
   *
   * in the function that you register on (click)='' you do:
   *
   * if(ClickService.isSelection()){
   *    // handle selection
   * }
   *
   */
  public static isSelection() {
    return this.getSelectionString().length !== 0;
  }

  private static getSelectionString() {
    return window.getSelection().toString();
  }
}
