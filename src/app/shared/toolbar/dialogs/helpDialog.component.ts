import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";

import { ToastrService } from "app/infrastructure/toastr/toastr.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "edit-help-dialog",
  templateUrl: "helpDialog.component.html",
  styleUrls: ["./helpDialog.component.scss"],
})
export class EditHelpDialogComponent implements OnInit {
  protected hyperlink: string;

  protected storageItem: any;

  protected currRoute: string = this.router.url;

  public constructor(
    public dialogRef: MatDialogRef<EditHelpDialogComponent>,
    private router: Router,
    public toastrService: ToastrService,
    private translateService: TranslateService
  ) {}

  public ngOnInit() {
    // Get the current value attach to this route
    this.hyperlink = localStorage.getItem(this.currRoute);
  }

  /**
   * First retrieve the currRoute location and based on that it will save
   * the hyperlink that has been giving by the userinput in the appropriate localstorage key
   */
  public save() {
    if (this.hyperlink) {
      // This if statement checks if http protocol is present. if not add it
      if (!this.hyperlink.match(/^https?:\/\//)) {
        this.hyperlink = `http://${this.hyperlink}`;
      }

      localStorage.setItem(this.currRoute, this.hyperlink);

      this.dialogRef.close();
      this.translateService.get("help.linkChanged").subscribe((res: string) => {
        this.toastrService.success(res);
      });
    } else {
      this.dialogRef.close();
      this.translateService.get("others.noLink").subscribe((res: string) => {
        this.toastrService.warning(res);
      });
    }
  }

  /**
   * On clicking cancel this func will close the dialog
   */
  public close() {
    this.dialogRef.close();
  }
}
