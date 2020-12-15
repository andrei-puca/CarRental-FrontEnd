import { Component, OnInit, ViewChild } from "@angular/core";

// required for the use of a Perfect Scrollbar directive
import { PerfectScrollbarDirective } from "ngx-perfect-scrollbar";

@Component({
  selector: "app-perfect-scrollbar",
  templateUrl: "./perfect-scrollbar.component.html",
  styleUrls: ["./perfect-scrollbar.component.scss"],
})
export class PerfectScrollbarExamplesComponent implements OnInit {
  @ViewChild("perfectScroll", { static: false })
  public perfectScroll: PerfectScrollbarDirective;

  public xPos: number; // Set x position for the ScrollTo method

  public yPos: number; // Set y position for the ScrollTo method

  public constructor() {}

  public ngOnInit() {}

  /**
   * Animate scroll to given x,y coordinates
   *
   * @param x Horizontal coordinates of the scrollbar
   * @param y Vertical coordinates of the scrollbar
   * @param speed scrolling speed of the scrollbar
   */
  public scrollTo(x, y) {
    this.perfectScroll.scrollTo(x, y);
  }

  /**
   * Animate scroll to given y coordinates.
   *
   * @param position Y position of the scrollbar
   * @param speed scrolling speed of the scrollbar
   */
  public scrollToY(position) {
    this.perfectScroll.scrollToY(position, 300);
  }

  /**
   *  Animate scroll to given x position.
   *
   * @param position X position of the scrollbar
   * @param speed scrolling speed of the scrollbar
   */
  public scrollToX(position) {
    this.perfectScroll.scrollToX(position, 300);
  }

  /**
   * Animate scroll to left.
   *
   * @param offset the offset position of the scrollbar
   * @param speed scrolling speed of the scrollbar
   */
  public scrollToLeft() {
    this.perfectScroll.scrollToLeft();
  }

  /**
   * Animate scroll to right.
   *
   * @param offset the offset position of the scrollbar
   * @param speed scrolling speed of the scrollbar
   */
  public scrollToRight() {
    this.perfectScroll.scrollToRight();
  }

  /**
   * Animate scroll to top.
   *
   * @param offset the offset position of the scrollbar
   * @param speed scrolling speed of the scrollbar
   */
  public scrollToTop() {
    this.perfectScroll.scrollToTop(0);
  }

  /**
   * Animate scroll to bottom.
   *
   * @param offset the offset position of the scrollbar
   * @param speed scrolling speed of the scrollbar
   */
  public scrollToBottom() {
    this.perfectScroll.scrollToBottom();
  }
}
