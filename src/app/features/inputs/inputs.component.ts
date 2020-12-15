import { Component } from "@angular/core";
import { AmazingTimePickerService } from "amazing-time-picker";
import { MAT_DATE_FORMATS } from "@angular/material/core";

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: "DD/MM/YYYY",
  },
  display: {
    dateInput: "DD/MM/YYYY",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY",
  },
};

@Component({
  selector: "app-inputs",
  templateUrl: "./inputs.component.html",
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
})
export class InputsComponent {
  public selectedTime: string;

  public dateToPass: any;

  public constructor(private atp: AmazingTimePickerService) {}

  /**
   * function that opens the timepicker
   * and passes the selected time to the selectedTime model
   * to display
   */
  public open(): void {
    const amazingTimePicker = this.atp.open(); // opens the timepicker
    amazingTimePicker.afterClose().subscribe((time) => {
      this.selectedTime = time; // the selected time
    });
  }
}
