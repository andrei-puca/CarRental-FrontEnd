import { Injectable, QueryList } from "@angular/core";
import { MatMenuTrigger } from "@angular/material/menu";
import { BehaviorSubject, Subscription } from "rxjs";
import { PixelPos } from "../../models/pos";

@Injectable({
  providedIn: "root",
})
export class ContextmenuService {
  public menuLeft = 0;

  public menuTop = 0;

  public subject: BehaviorSubject<PixelPos>;

  public constructor() {
    this.subject = new BehaviorSubject<PixelPos>({ x: this.menuLeft, y: this.menuTop });
  }

  /**
   * Subscribe pass-through
   */
  public subscribe(myFunc: any): Subscription {
    return this.subject.subscribe(myFunc);
  }

  /**
   * Set new subject values and send an update
   *
   * @param x
   * @param y
   */
  private updateSubject(x: number, y: number) {
    this.menuLeft = x;
    this.menuTop = y;
    this.subject.next({ x, y });
  }

  /**
   * Get a menu trigger by id
   *
   * @param trigger
   * @param id
   */
  private getTriggerById(trigger: QueryList<MatMenuTrigger>, id = "") {
    return trigger.find(
      (elem) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line no-underscore-dangle, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        elem._element.nativeElement.id.toLowerCase() === id.toLowerCase()
    );
  }

  /**
   * Prepare a trigger (should be called in the contextmenu method)
   *
   * @param event event created by the contextmenu method
   * @param trigger list of triggers
   * @param val id of trigger to get (has to be css id!)
   */
  public prepareTrigger(
    event: { clientX: number; clientY: number; preventDefault: () => void },
    trigger: QueryList<MatMenuTrigger>,
    val = ""
  ) {
    event.preventDefault();
    this.updateSubject(event.clientX, event.clientY);
    return this.getTriggerById(trigger, val);
  }
}
