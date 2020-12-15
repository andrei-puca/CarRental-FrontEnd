import { Component, OnInit } from "@angular/core";
import { AuthService } from "app/infrastructure/auth/auth.service";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-unauthorized",
  templateUrl: "./unauthorized.component.html",
  styleUrls: ["./unauthorized.component.scss"],
})
export class UnauthorizedComponent implements OnInit {
  public constructor(private dialogRef: MatDialog, public authService: AuthService) {
    this.dialogRef.closeAll(); // Close all open dialogs when this component is activated
  }

  public ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.authService.login();
    }
  }
}
