import { animate, keyframes, state, style, transition, trigger } from "@angular/animations";

export const fadeAnimation = trigger("flyInOut", [
  state(
    "inactive",
    style({
      display: "none",
      opacity: 0,
    })
  ),
  state("active", style({})),
  state("removed", style({ opacity: 0 })),
  transition("inactive => active", animate("{{ easeTime }}ms {{ easing }}")),
  transition("active => removed", animate("{{ easeTime }}ms {{ easing }}")),
]);

export const flyInOut = trigger("flyInOut", [
  state(
    "inactive",
    style({
      display: "none",
      opacity: 0,
    })
  ),
  transition(
    "inactive => active",
    animate(
      "400ms ease-out",
      keyframes([
        style({
          transform: "translate3d(100%, 0, 0) skewX(-30deg)",
          opacity: 0,
        }),
        style({
          transform: "skewX(20deg)",
          opacity: 1,
        }),
        style({
          transform: "skewX(-5deg)",
          opacity: 1,
        }),
        style({
          transform: "none",
          opacity: 1,
        }),
      ])
    )
  ),
  transition(
    "active => removed",
    animate(
      "400ms ease-out",
      keyframes([
        style({
          opacity: 1,
        }),
        style({
          transform: "translate3d(100%, 0, 0) skewX(30deg)",
          opacity: 0,
        }),
      ])
    )
  ),
]);
